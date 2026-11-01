require('dotenv').config();

const express = require('express');

const path = require('path');

// REST Countries v5 base URL. Requires a bearer API key (kept in .env).
const RC_API_KEY = process.env.RESTCOUNTRIES_KEY;

// Only request the fields the pages use.
if (!RC_API_KEY) {
  throw new Error('No REST Countries API available');
}

const app = express();
const port = process.env.PORT || 5001;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Setup for REST Countries API
const BASE_URL = 'https://api.restcountries.com/countries/v5';

const FIELDS =
  'names.common,capitals,region,population,flag.url_png,flag.url_svg,classification,uuid';

/**
 * Fetches one page (up to 100 records) from the REST Countries API.
 * Why: the free plan caps each request at 100, so the full list needs paging.
 */
async function fetchPage(offset) {
  const response = await fetch(
    `${BASE_URL}?limit=100&offset=${offset}&response_fields=${FIELDS}`,
    { headers: { Authorization: `Bearer ${RC_API_KEY}` } },
  );

  if (!response.ok) {
    throw new Error(`REST Countries returned ${response.status}`);
  }

  return response.json();
}

/**
 * Loops through every page and combines the results into one flat array.
 * Why: routes need all 254 records at once, but the API only returns 100 max.
 */
async function loadAllCountries() {
  const results = [];
  let offset = 0;
  let more = true;
  let lastMeta = null; // to check the final total is equal to result length

  while (more) {
    const page = await fetchPage(offset);

    results.push(...page.data.objects);

    offset += page.data.meta.count;
    more = page.data.meta.more;
    lastMeta = page.data.meta;

    // inf-loop guard
    if (page.data.meta.count === 0 && page.data.meta.more) {
      throw new Error('Offset never advances, inf loop');
    }
  }

  // count-matches-total guard
  if (results.length !== lastMeta.total) {
    throw new Error('Count does not match');
  }

  return results;
}

const countryShape = (cache) => {
  const reshapedCountry = [...cache]
    .sort((a, b) => a.names.common.localeCompare(b.names.common))
    .map((c) => ({
      name: c.names.common,
      capital:
        c.capitals.length === 0
          ? 'N/A'
          : c.capitals.map((capital) => capital.name).join(', ') || 'N/A',
      leader: 'N/A',
    }));

  return reshapedCountry;
};

const populousShape = (cache) => {
  const shaped = cache
    .filter((c) => c.population >= 50000000)
    .sort((a, b) => b.population - a.population)
    .map((c) => ({
      name: c.names.common,
      population: c.population,
      flag: c.flag.url_png,
    }));

  return shaped;
};

const regionShape = (cache) => {
  const regionMap = new Map();

  for (const c of cache) {
    const region = c.region || 'Unknown';
    const name = c.names.common;

    if (!regionMap.has(region)) {
      regionMap.set(region, []);
    }

    regionMap.get(region).push(name);
  }

  const regionArray = Array.from(regionMap.entries());

  const shaped = regionArray
    .map(([region, countries]) => ({
      region,
      count: countries.length,
      countries: countries.sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.region.localeCompare(b.region));

  return shaped;
};

app.get('/', (req, res) => res.redirect('/home'));

app.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

app.get('/countries', async (req, res) => {
  const formattedCountries = countryShape(countriesCache);

  res.render('countries', {
    title: 'Countries',
    countries: formattedCountries,
  });
});

app.get('/populous', async (req, res) => {
  const formattedCountries = populousShape(countriesCache);

  res.render('populous', {
    title: 'Populous',
    countries: formattedCountries,
  });
});

app.get('/regions', async (req, res) => {
  const formattedRegion = regionShape(countriesCache);

  res.render('regions', {
    title: 'Regions',
    regions: formattedRegion,
  });
});

app.all('/{*splat}', (req, res) => {
  res.status(404).send('PAGE NOT FOUND');
});

// Ideas: this cache the whole result (all country and all the fields needed for this task)
// Instead making 3 different api call to REST Countries, this make one, save it
// all 3 route read from this cache
let countriesCache = null;

async function start() {
  try {
    countriesCache = await loadAllCountries();

    app.listen(port, () => {
      console.log(`Loaded ${countriesCache.length} countries`);
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

start();

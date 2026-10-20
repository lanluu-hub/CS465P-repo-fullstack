const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'other',
  ];

  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Node Routing Exercise');
    res.end();
  } else if (url === `/${routes[0]}` && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Welcome to CS465P - HW02');
    res.end();
  } else if (url === `/${routes[1]}` && method === 'GET') {
    res.writeHead(302, { location: `/${routes[2]}` });
    res.end();
  } else if (url === `/${routes[2]}` && method === 'GET') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('This is redirected Page');
    res.end();
  } else if (url === `/${routes[3]}` && method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('this resource was cached');
    res.end();
  } else if (url === `/${routes[4]}` && method === 'GET') {
    res.setHeader('Set-Cookie', 'hello=world');
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('cookies...yummm');
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('404 - page not found');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

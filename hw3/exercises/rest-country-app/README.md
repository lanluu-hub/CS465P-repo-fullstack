# REST Country App

A small Express + Pug app that shows world country data from the
[REST Countries](https://restcountries.com/) v5 API.

## Pages

| Route        | Shows                                                              |
| ------------ | ------------------------------------------------------------------ |
| `/home`      | Welcome page                                                       |
| `/countries` | All countries A-Z with capitals and leaders                        |
| `/populous`  | Countries with 50 million+ people, most populous first, with flags |
| `/regions`   | Number of countries and country names in each region               |

## Requirements

- Node.js 18 or newer
- A free REST Countries API key (sign up at https://restcountries.com/)

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create your `.env` file from the example:

   ```
   copy .env.example .env
   ```

   Then open `.env` and replace `your_api_key_here` with your own REST Countries API key.

## Run

Development:

```
npm run dev
```

Then open http://localhost:3000/home

On startup the server loads all countries from the API once (three paged
requests) and caches them in memory. If the key is missing or the API call
fails, it exits with an error message.

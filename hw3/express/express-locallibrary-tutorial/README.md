# Express Tutorial: Local Library

Work for the MDN Express Tutorial (Parts 2-6). The site is an online
catalog for a small local library, built with Node, Express, and Pug.

Tutorial: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

## Tutorial parts completed

| Part | Topic                                                        |
| ---- | ------------------------------------------------------------ |
| 2    | Creating a skeleton website (Express Application Generator)  |
| 3    | Using a database (MongoDB with Mongoose) and creating models |
| 4    | Routes and controllers                                       |
| 5    | Displaying library data                                      |
| 6    | Working with forms                                           |
| 7    | Deploying to production (optional, not done)                 |

## Requirements

- Node.js (LTS version) and npm
- A MongoDB database (for example a free MongoDB Atlas cluster) and its
  connection string

## Setup

1. Go to the project folder and install dependencies:

   ```
   cd express/express-locallibrary-tutorial
   npm install
   ```

2. Create your `.env` file from the example and add your own MongoDB
   connection string:

   ```
   copy .env.example .env
   ```

   Then open `.env` and replace the `MONGODB_URI` placeholder. Do not
   commit `.env`.

3. load sample data with the tutorial's `populatedb.js` script,
   passing your connection string as the argument:

   ```
   node populatedb.js "<your MongoDB connection string>"
   ```

   MongoDB connection string should be the same of what you put in .env file

## Run

Development:

```
npm run devstart
```

With debug logging:

```
# macOS / Linux
DEBUG=express-locallibrary-tutorial:* npm run devstart

# Windows PowerShell
$ENV:DEBUG = "express-locallibrary-tutorial:*"; npm start
```

Then open http://localhost:3000/

Plain start, without nodemon: `npm start`

## Scripts

| Command            | What it does        |
| ------------------ | ------------------- |
| `npm start`        | `node ./bin/www`    |
| `npm run devstart` | `nodemon ./bin/www` |

## Project structure

```
app.js          App setup and middleware
bin/www         Server startup (port 3000 by default)
routes/         URL routes (catalog/ holds the library routes)
controllers/    Route handler functions
models/         Mongoose schemas (Book, Author, Genre, BookInstance)
views/          Pug templates
public/         Static files (CSS, images)
```

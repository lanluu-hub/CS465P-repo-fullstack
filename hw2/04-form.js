const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
app.get('/form', (req, res) => {
  res.status(200);
  res.type('text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
        <body>
            <form action="/submit" method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username"><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email"><br><br>
                <label for="comments">Comments:</label><br>
                <textarea id="comments" name="comments"></textarea><br>
                <label>
                    <input type="checkbox" name="newsletter" value="yes"> Sign up for the newsletter
                </label><br><br>
                <input type="submit" value="Submit">
            </form>
        </body>
    </html>
    `);
});

app.get('/', (req, res) => {
  res.status(200);
  res.type('text/html');
  res.send('04-form exercise: use /form to access to form');
});

// http://localhost:5001/submit should return all the data the user entered
app.post('/submit', (req, res) => {
  const { username, email, comments, newsletter } = req.body;
  res.type('text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
        <body>
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>Comments: ${comments}</p>
            <p>Newsletter: ${newsletter === 'yes' ? 'Yes' : 'No'}</p>
        </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

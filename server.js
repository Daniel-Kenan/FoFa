const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Define a simple route
app.get('/', (req, res) => {
    // Render the "index.ejs" template
    res.render("index");
});

app.get('/signup', (req, res) => {
  
    res.render("sign-up");
});

app.get('/signin', (req, res) => {
    res.render("sign-in");
});

app.get('/profile', (req, res) => {
    res.render("profile");
});

app.get('/dashboard', (req, res) => {
    res.render("dashboard");
});


app.get('/chat', (req, res) => {
    res.render("chatroom");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

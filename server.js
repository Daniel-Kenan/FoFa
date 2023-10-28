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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

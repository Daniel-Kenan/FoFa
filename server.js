const express = require('express');
const app = express();
const port = process.env.PORT || 5500;
const bodyParser = require('body-parser');
const users = [];
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
    app.set('view engine', 'ejs');



app.use(
        session({
          secret: 'your_secret_key', // Use a secret key to sign the session ID cookie
          resave: false,
          saveUninitialized: true,
        })
      );

app.post('/signin', (req, res) => {
        const { email, password } = req.body;
      
        // Check if the provided email and password match a user's credentials
        const user = users.find((user) => user.email === email && user.password === password);
      
        if (user) {
          req.session.user = user;
          res.redirect("/profile")
        } else {
          res.send('Invalid email or password');
        }
      });
app.post('/signup', (req, res) => {
        const { name, email, password } = req.body;
    
        // Check if the email is already registered
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            res.send('Email already registered');
        } else {
            // Store the data in the users array
            users.push({ name, email, password });
            res.redirect("/signin")
        }
    });


    // Define a simple route
app.get('/', (req, res) => {
    // Render the "index.ejs" template
    res.render("index");
});

app.get('/signup', (req, res) => {
  
    res.render("sign-up");
});
-+
app.get('/signin', (req, res) => {
    res.render("sign-in");
});
app.get('/pages/dashboard.html', (req, res) => {
    res.redirect("/dashboard");
});
app.get('/pages/profile.html', (req, res) => {
    res.redirect("/profile");
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        // User is authenticated, show their profile
        res.render('profile',{user:req.session.user});
    } else {
        // User is not authenticated, redirect to the sign-in page
        res.redirect('/signin');
    }
});

app.get('/dashboard', (req, res) => {
    res.render("dashboard",{user:req.session.user});
});


app.get('/chat', (req, res) => {
    res.render("chatroom");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

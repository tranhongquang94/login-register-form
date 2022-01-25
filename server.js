/**
 * Modules
*/

const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const path = require('path');

const app = express();

require('./auth');
require("dotenv").config();

// Define the port for backend server
const PORT = process.env.PORT || 8001;

//Receive JSON data and Form data, map it to req.body object.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Initialize the express session and passport session function
app.use(expressSession({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

//Set up database
let mysql = require('mysql2');

//Create a pool of connection to MySQL. Connection Pool help manage connection better than creating a single connection.
let connection = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bfbfabd0f50e94',
    password: '4699020f',
    database: 'heroku_7bc79f3a37a5f85'
  });


//Middleware function to check if user Logged In
function isLoggedIn (req, res, next) {
    req.user ? next() : res.status(401).send('Unauthorize.');
}


// Register API endpoint
app.post('/api/register', (req,res) => {
    const {fullName, email, password} = req.body;
    connection.query("INSERT INTO users(full_name, email, password) VALUES (? , ? ,?)", [fullName, email, password],(err, results) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        };
        res.status(200).send(results);
    })
});

//Login API endpoint
app.post('/api/login', (req,res) => {
    const {email, password} = req.body;
    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        };
        res.status(200).send(results);
        console.log(req.session)
    })
});

// Third party authentication with Google
app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']})
)

app.get('/api/callback', 
    passport.authenticate('google', {
        failureRedirect :'/',
        successRedirect: '/api/success',
    })
);

// Page redirected after login successful
app.get('/api/success' , isLoggedIn, ( req, res) => {
    console.log(res.auth)
    res.status(200).redirect(`/?user=${req.user.displayName}`);
})

app.get('/api/logout', (req, res) => {
    req.session.destroy();
    req.logout();
    res.status(200).send("logout successfully");
});

app.use(express.static(path.join(__dirname,"client","build")));

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT,() => {
    console.log(`Express App listen at port: ${PORT}`);
});
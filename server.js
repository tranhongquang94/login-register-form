/**
 * Modules requires
*/
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const path = require('path');
let mysql = require('mysql2');
require('./auth');
require("dotenv").config();

const app = express();

/**
 * Define the port for backend server
 */ 
const PORT = process.env.PORT || 8001;

/**
 * Allow Express to receive JSON data and Form data, map it to req.body object.
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Initialize the express session and passport session function
 */ 
app.use(expressSession({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());



/**
 * Create a pool of connection to MySQL. Connection Pool help manage connection better than creating a single connection.
 */
let connection = mysql.createPool({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'bfbfabd0f50e94',
    password: '4699020f',
    database: 'heroku_7bc79f3a37a5f85'
  });


/**
 * Middleware function to check if user Logged In
 */
function isLoggedIn (req, res, next) {
    req.user ? next() : res.status(401).send('Unauthorize.');
}

/**
 * Register API endpoint - check if user's email is in database, if not then create new user.
 */ 
app.post('/api/register', (req,res) => {
    const {fullName, email, password} = req.body;
    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            res.status(400).send(err);
        };

        if (results.length) {
            res.status(200).send({
                message: "This email is used for another account. Please choose a different email",
                showRegister: true,
            })
        } else {
            connection.query("INSERT INTO users(full_name, email, password) VALUES (? , ? ,?)", [fullName, email, password],(err, results) => {
                if (err) {
                    res.status(400).send(err);
                };
                res.status(200).send({
                    message: "Successfully created account",
                    showRegister: false
                });
            })
        }
    })
});

/**
 * Login API endpoint
 */
app.post('/api/login', (req,res) => {
    const {email, password} = req.body;
    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        };
        res.status(200).send(results);
    })
});

/**
 * Third party authentication with Google
 */
// API Endpoints to google log in page 
app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']})
)

//Redirect API after logged in from goole
app.get('/api/callback', 
    passport.authenticate('google', {
        failureRedirect :'/',
        successRedirect: '/api/success',
    })
);

// Page redirected after login successful - redirect to homepage with user credentials
app.get('/api/success' , isLoggedIn, ( req, res) => {
    res.status(200).redirect(`/?user=${req.user.displayName}`);
})

/**
 * Log out API Endpoint, destroy session and call logout for google authentication
 */
app.get('/api/logout', (req, res) => {
    req.session.destroy();
    req.logout();
    res.status(200).send("logout successfully");
});

/**
 * Server React client when in production
*/
app.use(express.static(path.join(__dirname,"client","build")));

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT,() => {
    console.log(`Express App listen at port: ${PORT}`);
});
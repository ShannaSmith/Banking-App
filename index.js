require('dotenv').config();
var express = require('express');
var app     = express();
var cors    = require('cors');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var dal     = require('./dal.js');
const authRouter = require('./auth');

app.use( bodyParser.urlencoded( {
    extended: true
}) );
app.use( bodyParser.json() );

// used to serve static files from public directory


app.use(cors());
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  // store: new SQLiteStore({ db: 'sessions.db', dir: 'var/db' })
}));

app.use(passport.authenticate('session'));

app.use('/', authRouter);

// create user account
app.post('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
             res.status(401).send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.status(200).send({
                        msg: "user login succesfully",
                       user:  user[0],
                       success: true
                    })  
                }
                else{
                    res.status(401).send('Login failed: wrong password');
                }
            }
            else{
                res.status(401).send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/
app.put('/account/update', function (req, res) {

    console.log('req.body',  req.body);
    const amount = Number(req.body.amount);

    dal.update(req.body.email, amount).
        then((response) => {
           //  console.log(response);
            res.send(response);
    });    
});

// update - withdraw/
app.put('/account/updateWithdraw', function (req, res) {

    console.log('req.body',  req.body);
    const amount = -Math.abs( Number(req.body.amount));

    dal.update(req.body.email, amount).
        then((response) => {
           //  console.log(response);
            res.send(response);
    });    
});


// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});



var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Running on port: ' + port));
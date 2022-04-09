var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use( bodyParser.urlencoded( {
    extended: true
}) );
app.use( bodyParser.json() );

// used to serve static files from public directory
app.use(express.static('public'));

app.use(cors());
app.use(methodOverride('_method'));

// create user account
app.post('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.status(401).send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.userName,req.params.email,req.params.password).
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


// update - deposit/withdraw amount
app.put('/account/update', function (req, res) {

    console.log('req.body',  req.body);
    var amount = Number(req.body.amount);

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



var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);
//Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongo db
mongoose.connect('mongodb://localhost:27017/contactlist');

//On connection success
mongoose.connection.on('connected',()=>{
    console.log('Connected to database Mongo DB @27017');
});

//On connection error
mongoose.connection.on('error', (err) => {
    if(err){
        console.log("Error in database connection: "+err);
    }
});

//port number
const port = 3000;

//adding middleware to be able to use cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//Static files
app.use(express.static(path.join(__dirname,'public')));

//we make use of express by defining all routes in a file
app.use('/api', route);


//testing server
app.get('/',(req,res)=>{
    res.send('foobar');
})

app.listen(port,()=>{
    console.log('Server started at port: '+port);
});


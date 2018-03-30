/**
 * Created by Michael M. Simon on 3/23/2018.
 */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const path = require('path');

//DB connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.uri, (err) => {
    if(err){
        console.log('--DB CONNECTION ERROR--' + err.message);
    }
    else {
        console.log('--DB CONNECTED-- ' + dbConfig.secret);
    }
});

/**
 * use dist directory to get the response page when requested
 */
app.use(express.static(__dirname + '/client/dist/'));

/*
 app.get('/', function(req, res){
 res.send('hello world');
 });
*/
//request end line specified with / and the request type and url inside the IF statement
app.use('/', (req, res) => {
    if(req.method === 'GET' || req.url === '/'){
        //set the url users get when requesting the page
        res.sendFile(path.join(__dirname + '/client/dist/index.html'));
    }

});
//specify port to listen to
const port = 3000;
app.listen(port, () => {
    console.log('Server listening on port: '+ port);
});

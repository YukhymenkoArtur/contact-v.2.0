var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

app.post('/contacts', function(req, res) {
    console.log('POST: /contacts');
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            console.error('Failed to connect to database: ' + err);
            res.send({
                success: false
            });
        } else {
            console.log('Successfully connected to database');
        }
        var insert = 'INSERT INTO salesforce.contact(lastname) ' +
                        'VALUES($1)';
        var newContact = req.body;
        client.query(insert, [ newContact.lastname ], function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log('Successfully inserted contact');
                res.send({
                    success: true
                });
            }
        });
    });
});

app.get('/contacts', function(req, res) {
    console.log('GET: /contacts');
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            console.error('Failed to connect to database: ' + err);
            res.send({
                success: false
            });
        } else {
            console.log('Successfully connected to database');
        }
        var queryStr = 'SELECT name, sfid FROM salesforce.contact';
        var query = client.query(queryStr)
        query.on('error', function(error) {
            console.log('Query errror: ' + error);
            res.status(500);
            res.send();
        });
        query.on('row', function(row, result) {
            result.addRow(row);
        });
        query.on('end', function(result) {
            res.status(200);
            res.send(result.rows);
        });
    });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
    console.log('Database URL: ' + process.env.DATABASE_URL);
});

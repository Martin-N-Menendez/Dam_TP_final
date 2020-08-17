var express = require('express');
var app = express();
var PORT = 3000;

var routerDisp = require('./routes/dispositivo');
var routerMedicion = require('./routes/medicion');
var routerRiego = require('./routes/riego');

app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/dispositivo', routerDisp);
app.use('/medicion', routerMedicion);
app.use('/riego', routerRiego);


app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});
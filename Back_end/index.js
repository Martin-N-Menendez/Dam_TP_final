var express = require('express');
var app = express();
var PORT = 3000;

var routerDisp = require('./routes/dispositivo');
var routerMedicion = require('./routes/medicion');

app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/dispositivo', routerDisp);
app.use('/medicion', routerMedicion);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});
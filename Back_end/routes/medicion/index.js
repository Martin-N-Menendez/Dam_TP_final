var express = require('express');
var routerMedicion = express.Router();
var pool = require('../../mysql');

class Medicion {
    constructor(id = 0, fecha = new Date("1900-01-01"), valor = 0) {
        this._medicionId = id;
        this._fecha = fecha;
        this._valor = valor;
    }
    get id() { return this._medicionId; }
    get fecha() { return this._fecha; }
    get valor() { return this._valor; }
}

// Recibe id de dispositivo y devuelve todas las mediciones desde la mas nueva hasta la mas vieja
routerMedicion.get('/:id/todas', function(req, res) {
    pool.query('Select * from Mediciones where dispositivoId=? order by fecha desc', [req.params.id], function(err, result, fields) {
        console.log(result);
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


// Recibe id de dispositivo y devuelve la medición mas nueva
routerMedicion.get('/:id', function(req, res) {
    pool.query('Select * from Mediciones where dispositivoId=? order by fecha desc', [req.params.id], function(err, result, fields) {
        var r = result[0];
        console.log(r);
        let medicion = new Medicion(
            r.medicionId,
            new Date(r.fecha),
            r.valor
        );
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(r);
    });
});


module.exports = routerMedicion;
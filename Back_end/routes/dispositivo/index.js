
//import { Dispositivo } from '../../models/dispositivo.model'

var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function(req, res) {
    pool.query('Select * from Dispositivos', function(err, result, fields) {
        console.log(req.params);
        /*let dispositivos = new Array();
        for (var i = 0; i < 9; i++) {
            var r = result[i];
            console.log(r);
            dispositivos.push(new Dispositivo(r.dispId, r.dispNom, r.dispUbi, new Medicion(r.medId, new Date(r.medFecha), r.medVal), new Electrovalvula(r.elecId, r.elecNom, r.elecApe)));
        }*/
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerDispositivo;
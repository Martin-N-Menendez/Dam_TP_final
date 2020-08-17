
//var Dispositivo = require('../../models/dispositivo.model')       // TODO importar los modelos como dios manda
//var Medicion = require('../../models/medicion.model')
//var Electrovalvula = require('../../models/electrovalvula.model')

var express = require('express');
var routerDispositivo = express.Router();
var pool = require('../../mysql');

class Dispositivo {
    constructor(id = 0, nombre = 'dispositivo', ubicacion = 'lugar', medicion = new Medicion(), electrovalvula = new Electrovalvula()) {
        this._dispositivoId = id;
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._medicion = medicion;
        this._electrovalvula = electrovalvula;
    }
    get id() { return this._dispositivoId; }
    set id(id) { this._dispositivoId = id; }

    get nombre() { return this._nombre; }
    set nombre(n) { this._nombre = n; }

    get ubicacion() { return this._ubicacion; }
    set ubicacion(u) { this._ubicacion = u; }

    get medicion() { return this._medicion; }
    set medicion(m) { this._medicion = m; }
    
    get electrovalvula() { return this._electrovalvula; }
    set electrovalvula(e) { this._electrovalvula = e; }
}

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

class Electrovalvula {
    constructor(id = 0, nombre = 'electrovalvula', apertura = 0) {
        this._electrovalvulaId = id;
        this._nombre = nombre;
        this._apertura = apertura;
    }
    get id() { return this._electrovalvulaId; }
    set id(value) { this._electrovalvulaId = value; }
    get nombre() { return this._nombre; }
    set nombre(value) { this._nombre = value; }
    get apertura() { return this._apertura; }
    set apertura(value) {
        this._apertura = value < 0 ? 0 : value > 100 ? 100 : value;
    }
}

class RiegoLog {
    constructor(electrovalvula = new Electrovalvula(), apertura = 0, fecha = new Date('1900-01-01')) {
        this._electrovalvula = electrovalvula;
        this._apertura = apertura < 0 ? 0 : apertura > 100 ? 100 : apertura;
        this._fecha = fecha;
    }
    get electrovalvula() { return this._electrovalvula; }
    set electrovalvula(e) { this._electrovalvula = e; }
    get apertura() { return this._apertura; }
    set apertura(value) {
        this._apertura = value < 0 ? 0 : value > 100 ? 100 : value;
    }
    get fecha() { return this._fecha; }
    set fecha(f) { this._fecha = f; }
}


//Devuelve un array de dispositivos
routerDispositivo.get('/', function(req, res) {
    pool.query('SELECT * FROM Listado', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        
        let dispositivos = new Array(Dispositivo);
        //console.log(result);

        for (var i = 0; i < 6; i++) {           // TODO como saber cuantos son?
            var r = result[i];
            console.log(r);
            dispositivos.push(new Dispositivo(
                r.dispositivoId, 
                r.nombre, 
                r.ubicacion, 
                r.electrovalvulaID, 
                new Medicion(r.medicionId, new Date(r.fecha), r.valor), 
                new Electrovalvula(r.electrovalvulaId, r.nombre, r.apertura)));
        }
        
        res.send(result);           // TODO esto es suficiente para q lo vea el Front End?
    });
});


//Devuelve un dispositivos en particular
routerDispositivo.get('/:id', function(req, res) {
    pool.query('SELECT * FROM Listado WHERE dispId=?',req.params.id,  function(err, result, fields) {       // TODO que hago si el ID no existe?
        if (err) {
            res.send(err).status(400);
            return;
        }
        var r = result[0];
        let dispositivo = new Dispositivo(
            r.dispositivoId,
            r.nombre,
            r.ubicacion,
            r.electrovalvulaID,
            new Medicion(r.medicionId,new Date(r.fecha),r.valor),
            new Electrovalvula(r.electrovalvulaId,r.nombre,r.apertura)
        );
        
        res.send(result);
    });
});


module.exports = routerDispositivo;
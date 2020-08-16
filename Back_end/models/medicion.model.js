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

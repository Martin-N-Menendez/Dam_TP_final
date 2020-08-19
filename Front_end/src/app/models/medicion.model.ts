export class Medicion {
    private _medicionId: number;
    private _fecha: Date;
    private _valor: number;
    private _dispositivoId: number;

    constructor(
        id: number = 0,
        fecha: Date = new Date("1900-01-01"),
        valor: number = 0,
        dispositivoId: number = 0) {

        this._medicionId = id;
        this._fecha = fecha;
        this._valor = valor;
        this._dispositivoId = dispositivoId;
    }

    public get id(): number { return this._medicionId; }

    public get fecha(): Date { return this._fecha; }

    public get valor(): number { return this._valor; }

    public get dispositivoId(): number { return this._dispositivoId; }
}
import { Electrovalvula } from './electrovalvula.model';
export class RiegoLog {
    private _electrovalvula: Electrovalvula;
    private _apertura: number;
    private _fecha: Date;

    constructor(
        electrovalvula: Electrovalvula = new Electrovalvula(), 
        apertura: number = 0,
        fecha: Date = new Date('1900-01-01')
        ) {
            this._electrovalvula = electrovalvula;
            this._apertura = apertura < 0 ? 0 : apertura > 100 ? 100 : apertura;
            this._fecha = fecha;
    }

    public get electrovalvula(): Electrovalvula { return this._electrovalvula; }
    public set electrovalvula(e: Electrovalvula) { this._electrovalvula = e; }

    public get apertura(): number { return this._apertura; }
    public set apertura(value: number) { 
        this._apertura = value < 0 ? 0 : value > 100 ? 100 : value;
    }

    public get fecha(): Date { return this._fecha; }
    public set fecha(f: Date) { this._fecha = f; }
}
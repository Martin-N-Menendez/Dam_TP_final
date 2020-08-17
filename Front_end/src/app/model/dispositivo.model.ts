import { Electrovalvula } from './electrovalvula.model';
import { Medicion } from './medicion.model';
export class Dispositivo {
    private _dispositivoId: number;
    private _nombre: string;
    private _ubicacion: string;
    private _medicion: Medicion;
    private _electrovalvula: Electrovalvula;

    public constructor(
        id: number = 0,
        nombre: string = 'dispositivo',
        ubicacion: string = 'lugar',
        medicion: Medicion = new Medicion(),
        electrovalvula: Electrovalvula = new Electrovalvula()
    ) {
        this._dispositivoId = id;
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._medicion = medicion;
        this._electrovalvula = electrovalvula;
    }

    public get id(): number { return this._dispositivoId; }
    public set id(id: number) { this._dispositivoId = id; }

    public get nombre(): string { return this._nombre; }
    public set nombre(n: string) { this._nombre = n; }

    public get ubicacion(): string { return this._ubicacion; }
    public set ubicacion(u: string) { this._ubicacion = u; }

    public get medicion(): Medicion { return this._medicion; }
    public set medicion(m: Medicion) { this._medicion = m }

    public get electrovalvula(): Electrovalvula { return this._electrovalvula; }
    public set electrovalvula(e: Electrovalvula) { this._electrovalvula = e; }
}
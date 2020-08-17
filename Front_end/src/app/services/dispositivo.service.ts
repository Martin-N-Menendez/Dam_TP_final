import { Injectable } from '@angular/core';
import { Dispositivo } from '../models/dispositivo.model';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../models/medicion.model';
import { Electrovalvula } from '../models/electrovalvula.model';
import { FilaListado } from '../models/filaListado.interface';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  public get listado(): Promise<Array<Dispositivo>> {
    return this._http.get("http://localhost:3000/dispositivo").toPromise().then(
      (listado: Array<FilaListado>) => {
        console.log(listado);
        let listado2: Array<Dispositivo> = new Array<Dispositivo>();
        listado.forEach(r => listado2.push(new Dispositivo(
          r.dispId,
          r.dispNom,
          r.dispUbi,
          new Medicion(r.medId, new Date(r.medFecha),parseInt(r.medVal)),
          new Electrovalvula(r.elecId,r.elecNom,r.elecApe)
          )));
        return listado2;
      }
    ).catch(
      (err) => {
        console.log("Error en la consulta");
        return new Array<Dispositivo>(new Dispositivo());
      }
    );
  }

  public getDispositivo(id: number): Promise<Dispositivo> {
    return this._http.get("http://localhost:3000/dispositivo/" + id).toPromise().then(
      (r: FilaListado) => {
        let d = r[0];
        let dispositivo: Dispositivo = new Dispositivo(
          d.dispId,
          d.dispNom,
          d.dispUbi,
          new Medicion(d.medId, new Date(d.medFecha),parseInt(d.medVal)),
          new Electrovalvula(d.elecId,d.elecNom,d.elecApe)
        );
        console.log(d.dispId);
        console.log("Dispositivo prometido " + dispositivo );
        return dispositivo;
      }
    ).catch((err) => {
      console.log("error en la consulta");
      return new Dispositivo();
    });
  }

}
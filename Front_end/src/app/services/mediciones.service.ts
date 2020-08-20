import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../models/medicion.model';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {

  constructor(private _http: HttpClient) { }

  public getMediciones(dispId: number): Promise<Array<Medicion>> {
    return this._http.get("http://localhost:3000/medicion/" + dispId)
      .toPromise()
      .then((m: Array<Medicion>) => {
        let measurements: Array<Medicion> = new Array<Medicion>();
        console.log(measurements);
        m.forEach(e => measurements.push(new Medicion(
          e.medicionId,
          e.fecha,
          e.valor,
          e.dispositivoId
        )))
        return measurements;
      })
      .catch((err) => {
        console.log("error en la consulta");
        return new Array<Medicion>(new Medicion());
      })
  }

  public getnewMedicionLogs(id: number): Promise<Array<Medicion>> {
    return this._http.get("http://localhost:3000/medicion/" + id + "/todas").toPromise().then( 
      (r: Array<Medicion>) => {
        //console.log("Riego prometido " + r );
        return r;
      }
    ).catch((err) => {
      console.log("error en la consulta de mediciones");
      return new Array<Medicion>();
    });
  }

  public addnewMedicionLog(x: Medicion) {
    return this._http.post(`http://localhost:3000/medicion/`,[x.valor, x.dispositivoId]).toPromise()
      .then((result) => {
        return result;
      });
  }

}

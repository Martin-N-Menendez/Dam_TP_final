import { Injectable } from '@angular/core';
import { RiegoLog } from '../models/riego.model';
import { HttpClient } from '@angular/common/http';
import { FilaLogRiego } from '../models/filaLogRiego.interface';
import { Electrovalvula } from '../models/electrovalvula.model';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {

  constructor(private _http: HttpClient) { }

  public getRiegoLog(valve: number): Promise<Array<RiegoLog>> {
    return this._http.get(`http://localhost:3000/riego/${valve}`)
      .toPromise()
      .then((table: Array<FilaLogRiego>) => {
        let logRiego: Array<RiegoLog> = new Array<RiegoLog>();
        table.forEach(row => logRiego.push(new RiegoLog(
          new Electrovalvula(row.electralvulaId),
          row.apertura,
          row.fecha
        )))
        return logRiego;
      })
      .catch((err) => {
        console.log("error en la consulta");
        return new Array<RiegoLog>(new RiegoLog());
      })
  }

  public newRiegoLog(fila: FilaLogRiego) {
    return this._http.post(`http://localhost:3000/riego/`,[fila.apertura, fila.electralvulaId]).toPromise()
      .then((result) => {
        return result;
      });
  }
}

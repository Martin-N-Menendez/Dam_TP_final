import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  listado:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor() {

    // Utilizar el HTTPCLIENT y conectarse aca al puerto

    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    var disp5:Dispositivo= new Dispositivo(5,"Sensor 5","Habitacion 1",5);
    var disp6:Dispositivo= new Dispositivo(6,"Sensor 6","Habitacion 2",6);

    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
    this.listado.push(disp5);
    this.listado.push(disp6);
   }

   getDispositivo(id):Dispositivo{
      return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
   }
}

import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../models/dispositivo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public listado: Array<Dispositivo>;
  public notificacion(valor:number = 10): number {
    if(valor < 10)
      return 0;
    else if(valor < 30)
      return 3;
    else if(valor < 60)
      return 1;
    else
      return 2;
  }
  constructor(public dServ: DispositivoService) {
    this.listado = new Array<Dispositivo>();
    this.dServ.listado.then(list => {
      this.listado = list;
    });
   }

  ngOnInit() { }

}

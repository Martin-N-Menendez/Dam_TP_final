import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiegoLog } from '../models/riego.model';
import { RiegoService } from '../services/riego.service';
import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-log-riego',
  templateUrl: './log-riego.page.html',
  styleUrls: ['./log-riego.page.scss'],
})
export class LogRiegoPage implements OnInit {

  public disp: Dispositivo;
  public logsRiego: Array<RiegoLog>;

  constructor(private router: ActivatedRoute, private dServe:DispositivoService, private rServ: RiegoService) {
    this.logsRiego = new Array<RiegoLog>();
  }

  ngOnInit() {
    let dispId: number = parseInt(this.router.snapshot.paramMap.get('dispId'));
    this.dServe.getDispositivo(dispId).then((disp) => {
      this.disp = disp;
      this.rServ.getRiegoLog(this.disp.electrovalvula.id).then((logs) => {
        console.log(logs);
        this.logsRiego = logs;
      })
    });
  }

}

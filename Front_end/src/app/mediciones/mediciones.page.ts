import { Component, OnInit } from '@angular/core';
import { Medicion } from '../models/medicion.model';
import { MedicionesService } from '../services/mediciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  public measurements: Array<Medicion>;

  constructor(private mServ:MedicionesService, private router: ActivatedRoute) { 
    this.measurements = new Array<Medicion>();
  }

  ngOnInit() {
    let dispId: number = parseInt(this.router.snapshot.paramMap.get('dispId'));
    this.mServ.getMediciones(dispId).then((meds) => {
      this.measurements = meds;
    })
  }

}

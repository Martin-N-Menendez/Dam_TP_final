//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';
import { RiegoService } from '../services/riego.service';
import { FilaLogRiego } from '../models/filaLogRiego.interface';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.page.html',
  styleUrls: ['./detalle-sensor.page.scss'],
})
export class DetalleSensorPage implements OnInit {

  public mensajeBoton: string = "ABRIR ELECTROVALVULA";

  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;

  public dispositivo: Dispositivo;

  public laGranBilardo: Array<Dispositivo>;

  constructor(private dServ: DispositivoService, private router: ActivatedRoute, private rServ: RiegoService) {
    this.laGranBilardo = new Array<Dispositivo>();
    setTimeout(() => {
      console.log("Cambio el valor del sensor");
      this.valorObtenido = this.dispositivo.medicion.valor;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({
        series: [{
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA'
          }
        }]
      });
    }, 6000);
  }

  ngOnInit() {
    let id: number = parseInt(this.router.snapshot.paramMap.get('id'));
    this.dServ.getDispositivo(id).then(d => {
      console.log(d);
      this.dispositivo = d;
      this.laGranBilardo.push(this.dispositivo);
    });
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: this.dispositivo.nombre
      }

      , credits: { enabled: false }


      , pane: {
        startAngle: -150,
        endAngle: 150
      }
      // the value axis
      , yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#BBBBBB'
        }, {
          from: 10,
          to: 30,
          color: '#55BF3B'
        }, {
          from: 30,
          to: 60,
          color: '#DDDF0D'
        }, {
          from: 60,
          to: 100,
          color: '#DF5353'
        }]
      }
      ,

      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

  public actualizarValvula() {
    if (this.dispositivo.electrovalvula.apertura != 0) {
      console.log("cerrando valvula");
      let data = {
        logRiegoId: 0,
        apertura: 0,
        fecha: new Date(),
        electralvulaId: this.dispositivo.electrovalvula.id
      }
      this.rServ.newRiegoLog(data).then((result) => {
        console.log(result);
        console.log("valvula cerrada");
        this.mensajeBoton = "ABRIR VALVULA";
      })
    } else {
      console.log("abriendo valvula");
      let data = {
        logRiegoId: 0,
        apertura: 100,
        fecha: new Date(),
        electralvulaId: this.dispositivo.electrovalvula.id
      }
      this.rServ.newRiegoLog(data).then((result) => {
        console.log(result);
        console.log("valvula abierta");
        this.mensajeBoton = "CERRAR VALVULA";
      })
    }
  }
}

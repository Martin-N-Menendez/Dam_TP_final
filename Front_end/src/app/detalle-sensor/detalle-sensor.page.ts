//correr antes npm install --save highcharts
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Dispositivo } from '../models/dispositivo.model';
import { RiegoLog } from '../models/riego.model';
import { Medicion } from '../models/medicion.model';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute } from '@angular/router';
import { RiegoService } from '../services/riego.service';
import { MedicionesService } from '../services/mediciones.service';

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

  public dispId: number;

  public dispositivo: Dispositivo;
  public riego_log: RiegoLog;
  public riego_log_post: RiegoLog;
  public medicion: Medicion;
  public medicion_log_post: Medicion;

  public Dispositivos: Array<Dispositivo>;
  public riego_logs: Array<RiegoLog>;
  public mediciones: Array<Medicion>;

  constructor(private dServ: DispositivoService, private router: ActivatedRoute, private rServ: RiegoService, private mServ: MedicionesService) {

    this.dispId = parseInt(this.router.snapshot.paramMap.get('id'));

    this.Dispositivos = new Array<Dispositivo>();
    this.riego_logs = new Array<RiegoLog>();
    this.mediciones = new Array<Medicion>();

    this.dispositivo = new Dispositivo();
    this.riego_log = new RiegoLog();
    this.medicion = new Medicion();

    //this.generarChart();
    
  }

  ngOnInit() {
    this.actualizar_datos();
    this.generarChart();

    this.dispositivo = this.Dispositivos[0];
      console.log("Cambio el valor del sensor",this.dispositivo);  

      this.valorObtenido = this.riego_log.apertura;
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
  }

  ionViewWillEnter(){
    this.actualizar_datos();  
    //this.generarChart();
  }

  ionViewDidEnter() {
    //this.actualizar_datos();  
    //this.generarChart();
  }

  actualizar_datos(){

    // get_medicion(Id)
    // Obtener medicion.valor  -> actualizar valor de mychart

    this.generarChart();

    this.dServ.getDispositivo(this.dispId ).then(d => {
      console.log("X",d);
      this.dispositivo = d;
      this.Dispositivos.push(this.dispositivo); //TODO  Esto inc y aumenta la cantidad de botones
    });
    this.rServ.getnewRiegoLog(this.dispId ).then(r => {
      console.log("Y",r);
      this.riego_log = r;
      this.riego_logs.push(this.riego_log);
      if(this.riego_log.apertura == 0)
        this.mensajeBoton = "ABRIR ELECTROVALVULA " + this.riego_log.electrovalvulaId;
      else
        this.mensajeBoton = "CERRAR ELECTROVALVULA " + this.riego_log.electrovalvulaId;
    });
  }

  generarChart() {
    console.log("R",this.dispositivo);
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: this.dispositivo.ubicacion
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
    if(this.riego_log.apertura == 0)
      this.abrirValvula();
    else
      this.cerrarValvula();
  }

  public abrirValvula() {
    this.riego_log_post = new RiegoLog();

    this.riego_log_post.electrovalvulaId = this.dispositivo.electrovalvulaId;
    this.riego_log_post.apertura = 100;
    this.riego_log_post.fecha = new Date();

    this.rServ.addnewRiegoLog(this.riego_log_post).then( (res) => {
      this.riego_log.apertura = 100;
      this.mensajeBoton = "CERRAR ELECTROVALVULA" + ' ' + this.dispositivo.electrovalvulaId;
      console.log(this.riego_log_post);  
    })

    this.medicion_log_post = new Medicion();
    this.medicion_log_post.medicionId = this.dispositivo.electrovalvulaId;
    this.medicion_log_post.dispositivoId = this.dispositivo.electrovalvulaId;
    this.medicion_log_post.valor = 100;
    this.medicion_log_post.fecha = new Date();

    this.mServ.addnewMedicionLog(this.medicion_log_post).then( (res) => {
      //this.riego_log.apertura = 0;
      //this.mensajeBoton = "ABRIR ELECTROVALVULA" + ' ' + this.dispositivo.electrovalvulaId;
      console.log(this.medicion_log_post);  
    })

    this.myChart.update(
      {
        series: [
          {
            name: 'kPA',
            data: [this.riego_log_post.apertura],
            tooltip: { valueSuffix: ' kPA' }
          }
        ]
      }
    );
    
  }

  public cerrarValvula() {
    
    this.riego_log_post = new RiegoLog();
    this.riego_log_post.electrovalvulaId = this.dispositivo.electrovalvulaId;
    this.riego_log_post.apertura = 0;
    this.riego_log_post.fecha = new Date();

    this.rServ.addnewRiegoLog(this.riego_log_post).then( (res) => {
      this.riego_log.apertura = 0;
      this.mensajeBoton = "ABRIR ELECTROVALVULA" + ' ' + this.dispositivo.electrovalvulaId;
      console.log(this.riego_log);  
    })
    
    this.medicion_log_post = new Medicion();
    this.medicion_log_post.medicionId = this.dispositivo.electrovalvulaId;
    this.medicion_log_post.dispositivoId = this.dispositivo.electrovalvulaId;
    this.medicion_log_post.valor = 0;
    this.medicion_log_post.fecha = new Date();

    this.mServ.addnewMedicionLog(this.medicion_log_post).then( (res) => {
      //this.riego_log.apertura = 0;
      //this.mensajeBoton = "ABRIR ELECTROVALVULA" + ' ' + this.dispositivo.electrovalvulaId;
      console.log(this.medicion_log_post);  
    })
      
    this.myChart.update(
      {
        series: [
          {
            name: 'kPA',
            data: [this.riego_log_post.apertura],
            tooltip: { valueSuffix: ' kPA' }
          }
        ]
      }
    );

  }

}


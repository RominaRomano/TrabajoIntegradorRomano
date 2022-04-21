import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  modalSwitch:boolean=false;
  proyectolist:any;
  procesoABM:string="";
  proyectoModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(datos=>{
      this.proyectolist=datos.proyecto;
      //console.log(datos);
      this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
    });
  }
  public abreModal(proceso:string, proyecto:any){
    this.modalSwitch=true;
    this.procesoABM=proceso;
    this.proyectoModBaj=proyecto;
    //console.log(this.proyectoModBaj.nombre)
    //console.log(this.procesoABM);
    //console.log(this.modalSwitch);
  }
}
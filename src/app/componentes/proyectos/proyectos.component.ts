import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';
import { Proyecto } from 'src/app/data/Proyecto';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  proyectolist:Proyecto[]=[];
  procesoABM:string="";
  proyectoModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosProyecto().subscribe(datos=>{
      this.proyectolist=datos;
      //console.log(datos);
      this.UsuaLog = this.autService.UsuarioLoggeado();
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
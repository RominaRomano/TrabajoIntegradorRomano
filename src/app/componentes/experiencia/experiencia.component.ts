import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';
import { Experiencia } from 'src/app/data/Experiencia';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  experiencialist:Experiencia[]=[];
  procesoABM:string="";
  experienciaModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe(datos=>{
      this.experiencialist=datos;
      //console.log(datos);
      this.UsuaLog = this.autService.UsuarioLoggeado();
      this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
    });
  }
  public abreModal(proceso:string, experiencia:any){
    this.modalSwitch=true;
    this.procesoABM=proceso;
    this.experienciaModBaj=experiencia;
    //console.log(this.experienciaModBaj.nombre)
    //console.log(this.procesoABM);
    //console.log(this.modalSwitch);
  }
}

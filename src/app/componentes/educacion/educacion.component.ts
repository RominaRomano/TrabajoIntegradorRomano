import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';
import { Educacion } from 'src/app/data/Educacion';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  
  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  educacionlist:Educacion[]=[];
  procesoABM:string="";
  escuelaModBaj:any;

  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosEducacion().subscribe(datos=>{
      this.educacionlist = datos;
      //console.log(datos);
      this.UsuaLog = this.autService.UsuarioLoggeado();
      this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
    });
  }
  public abreModal(proceso:string, escuela:any){
    this.modalSwitch=true;
    this.procesoABM=proceso;
    this.escuelaModBaj=escuela;
    //console.log(this.escuelaModBaj.nombre)
    //console.log(this.procesoABM);
    //console.log(this.modalSwitch);
  }
}

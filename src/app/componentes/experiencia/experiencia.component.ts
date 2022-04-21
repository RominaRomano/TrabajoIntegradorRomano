import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  modalSwitch:boolean=false;
  experiencialist:any;
  procesoABM:string="";
  experienciaModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(datos=>{
      this.experiencialist=datos.experiencia;
      //console.log(datos);
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

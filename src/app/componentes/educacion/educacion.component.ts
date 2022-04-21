import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  modalSwitch:boolean=false;
  educacionlist:any;
  procesoABM:string="";
  escuelaModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(datos=>{
      this.educacionlist=datos.educacion;
      //console.log(datos);
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

import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  modalSwitch:boolean=false;
  habilidadlist:any;
  procesoABM:string="";
  habilidadModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(datos=>{
      this.habilidadlist=datos.habilidad;
      //console.log(datos);
      this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
    });
  }
  public abreModal(proceso:string, habilidad:any){
    this.modalSwitch=true;
    this.procesoABM=proceso;
    this.habilidadModBaj=habilidad;
    //console.log(this.escuelaModBaj.nombre)
    //console.log(this.procesoABM);
    //console.log(this.modalSwitch);
  }

  public  colorConic(porcentaje:string){
    return `conic-gradient(#e47711 ${porcentaje},#f7bc7a ${porcentaje})`;
  }
}
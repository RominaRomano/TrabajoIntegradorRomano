import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';
import { Habilidad } from 'src/app/data/Habilidad';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  habilidadlist:Habilidad[]=[];
  procesoABM:string="";
  habilidadModBaj:any;
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosHabilidad().subscribe(datos=>{
      this.habilidadlist=datos;
      //console.log(datos);
      this.UsuaLog = this.autService.UsuarioLoggeado();
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
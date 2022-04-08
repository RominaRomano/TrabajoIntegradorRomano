import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SwitchService } from 'src/app/servicios/switch.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  
  modalSwitch:boolean=false;
  miPortfolio:any;
  
  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(datos=>{
      this.miPortfolio=datos;});
      //console.log(datos);
    this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
  }

  public abreModal(){
    this.modalSwitch=true;
    //console.log(this.modalSwitch);
  }

}

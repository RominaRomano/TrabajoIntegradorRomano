import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  habilidadlist:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(datos=>{
      this.habilidadlist=datos.habilidad;
    });
  }
  public  colorConic(colorfuerte:string, colordebil:string, porcentaje:string){
    return `conic-gradient(${colorfuerte} ${porcentaje},${colordebil} ${porcentaje})`;
  }
}
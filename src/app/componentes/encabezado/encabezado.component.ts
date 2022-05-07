import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  
  miPortfolio:any;
  UsuaLog:boolean=false;
  
  constructor(private datosPortfolio:PortfolioService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosPersona().subscribe(datos=>{
      this.miPortfolio = datos[0]; });
    this.UsuaLog = this.autService.UsuarioLoggeado();
  }

  logout(): void {
    this.autService.logout();
    this.UsuaLog = false;
    window.location.reload();
  }
}
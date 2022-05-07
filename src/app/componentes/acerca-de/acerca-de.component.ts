import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  miPortfolio:any;
  UsuaLog:boolean=false;
  mail:string="";
  edad=0;
  constructor(private datosPortfolio:PortfolioService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatosPersona().subscribe(datos=>{
      this.miPortfolio=datos[0];
      this.mail="mailto:"+this.miPortfolio.email;
      //console.log(datos);
      this.UsuaLog = this.autService.UsuarioLoggeado();
      //costó pero salió
      const fechaDate = new Date( this.miPortfolio.fechNac); //convierte el string en objeto Date OJO: el string de estar en formato mm/dd/aaaa
      const diferencia = Math.abs(Date.now() - fechaDate.getTime()); //guarda la diferencia (en milisegundos) entre fecha actual y fecha de nacimiento
      this.edad=Math.floor((diferencia/(24*3600*1000))/365); //convierte en cantidad de días, luego convierte en años(/365) y luego con floor redondea a nro entero hacia abajo
    });
  }
}
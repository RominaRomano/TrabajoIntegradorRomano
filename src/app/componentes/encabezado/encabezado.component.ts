import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service'; // Trae datos
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import { SwitchService } from 'src/app/servicios/switch.service'; // Apertura y cierre del Modal
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})

export class EncabezadoComponent implements OnInit {
  
  miPersona:any;
  UsuaLog:boolean=false;
  modalSwitch:boolean=false;
  persona:any;
  nuevoBanner:string="";
  nuevoPerfil:string="";
  foto:string="";
  error:boolean=false;
  mensaje:string="";

  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService, private autService:AutenticacionService) { }
  
  ngOnInit(): void {
    this.UsuaLog = this.autService.UsuarioLoggeado();
    this.cargarPersona();
    this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
  }

  private cargarPersona() {  // ACTUALIZA LA PERSONA CON LOS CAMBIOS
    this.datosPortfolio.obtenerDatosPersona().subscribe(datos=>{
      this.miPersona = datos[0]; });
      //console.log(datos);
  }

  Editar(Foto:string) {
    this.abreModal();
    this.foto=Foto;
    if (this.foto=="B"){ this.mensaje="Banner";} else { this.mensaje="Perfil"; }
  }
  onEnviar() {  
    if (this.foto=="B") {
      if (this.nuevoBanner!=""){
        this.miPersona.dirBanner = this.nuevoBanner; 
        this.cierraModal();}
      else {
        this.ventanaError();
      }
    }
    else {
      if (this.nuevoPerfil!=""){
        this.miPersona.dirPerfil = this.nuevoPerfil; 
        this.cierraModal();}
      else {
        this.ventanaError();
      }
    }
    this.datosPortfolio.modificarPersona(this.miPersona).subscribe(
      () => {
    this.cargarPersona(); // ACTUALIZA LA VISTA
    if (!this.error){this.cierraModal();}
  })
  }

  ventanaError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Debe seleccionar una opción.',
      showConfirmButton: false,
      timer: 2000 })
      this.error=true;
  }

  logout(): void {
    this.autService.logout();
    this.UsuaLog = false;
    window.location.reload();
  }

  abreModal(){
    this.modalSwitch=true;
  }
  
  cierraModal(){
    this.modalSS.$modal.emit(false);
  }
}
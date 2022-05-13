import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; // Control de formulario CRUD
import { PortfolioService } from 'src/app/servicios/portfolio.service'; // Trae datos
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import { SwitchService } from 'src/app/servicios/switch.service'; // Apertura y cierre del Modal
import { Persona } from 'src/app/data/Persona';  // Interfaz para Tipo Persona
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario

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
  modalSwitch:boolean=false;
  form:FormGroup;

  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder, private modalSS:SwitchService, private autService:AutenticacionService) {
    this.form=this.formBuilder.group(
    {
      id:[0,[Validators.nullValidator]],
      nombape:['',[Validators.required]],
      direccion:['',[Validators.nullValidator]],
      email:['',[Validators.required, Validators.email]],
      acercade:['',[Validators.nullValidator]],
      fechNac:['',[Validators.nullValidator]],
      dirPerfil:['',[Validators.nullValidator]],
      dirBanner:['',[Validators.nullValidator]]
    });
  }
  ngOnInit(): void {
    this.cargarPersona();
    this.UsuaLog = this.autService.UsuarioLoggeado();
    this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
  }

  private cargarPersona(){
    this.datosPortfolio.obtenerDatosPersona().subscribe(datos=>{
      this.miPortfolio=datos[0];
      //console.log(datos);
    
      this.mail="mailto:"+this.miPortfolio.email;
    
      //costó pero salió
      const fechaDate = new Date( this.miPortfolio.fechNac); //convierte el string en objeto Date OJO: el string de estar en formato mm/dd/aaaa
      const diferencia = Math.abs(Date.now() - fechaDate.getTime()); //guarda la diferencia (en milisegundos) entre fecha actual y fecha de nacimiento
      this.edad=Math.floor((diferencia/(24*3600*1000))/365); //convierte en cantidad de días, luego convierte en años(/365) y luego con floor redondea a nro entero hacia abajo  }
          
    });}
    

  abreModal(){
    this.modalSwitch=true;
  }
  
  cierraModal(){
    this.modalSS.$modal.emit(false);
  }

  Editar() {
    this.abreModal();
    this.cargaForm(this.miPortfolio);
  }

  onEnviar() {  // CON EL CLICK DEL BOTON
    let persona:Persona = this.form.value; // Tomo valores del formulario
    Swal.fire({
      title: 'Desea realizar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#6daf17',
      denyButtonColor: '#2c5e19' ,
      cancelButtonColor: '#af4808',
      confirmButtonText: 'Guardar',
      denyButtonText: `No Guardar`
    }).then((result) => {
      if (result.isConfirmed) { // Si confirma los cambios
        this.datosPortfolio.modificarPersona(persona).subscribe( //Modifica la BD
          () => {
        this.cargarPersona(); // ACTUALIZA EL ARRAY
        })
        Swal.fire({ // Informa al usuario 
          position: 'center',
          icon: 'success',
          title: 'La modificación se realizó con éxito.',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (result.isDenied) { // si decidió no guardar cambios también informa
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Los cambios NO fueron guardados.',
          showConfirmButton: false,
          timer: 2000 })
    }
  })
  this.cierraModal();
}

  private cargaForm(persona:Persona) {
    this.form.setValue({
      id:persona.id,
      nombape:persona.nombape,
      direccion:persona.direccion,
      email:persona.email,        
      acercade:persona.acercade,
      fechNac:persona.fechNac,
      dirPerfil:persona.dirPerfil,
      dirBanner:persona.dirBanner
      })
  }
}
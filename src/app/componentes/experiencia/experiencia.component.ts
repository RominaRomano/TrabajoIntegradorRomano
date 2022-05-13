import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; // Control de formulario CRUD
import { PortfolioService } from 'src/app/servicios/portfolio.service'; // Trae datos
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import { SwitchService } from 'src/app/servicios/switch.service'; // Apertura y cierre del Modal
import { Experiencia } from 'src/app/data/Experiencia';  // Interfaz para Tipo Experiencia
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  experiencialist:Experiencia[]=[];
  experiencia:any;
  form:FormGroup;
  mensajeBoton:string="";
  public baja:boolean=false;

  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder, private modalSS:SwitchService, private autService:AutenticacionService) {
    this.form=this.formBuilder.group(
    {
      id:[0,[Validators.nullValidator]],
      empresa:['',[Validators.required]],
      puesto:['',[Validators.required]],
      contacto:['',[Validators.nullValidator]],
      tarea:['',[Validators.nullValidator]],        
      fechini:['',[Validators.required]],
      fechfin:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarArray();
    this.UsuaLog = this.autService.UsuarioLoggeado();
    this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
  }

  private cargarArray() {  // ACTUALIZA EL ARRAY CON LOS CAMBIOS
    this.datosPortfolio.obtenerDatosExperiencia().subscribe(datos=>{
      this.experiencialist = datos;});
      //console.log(datos);
  }

  Alta() {
    this.abreModal();
    this.limpiaForm();
    this.baja=false;
    this.mensajeBoton="Alta";
  }

  Modificacion(i: number) {
    this.abreModal();
    this.experiencia = this.experiencialist[i];
    this.mensajeBoton="Modificación";
    this.baja=false;
    this.cargaForm(this.experiencia);
  }

  Baja(i: number) {
    this.abreModal();
    this.experiencia = this.experiencialist[i];
    this.mensajeBoton="Baja";
    this.baja=true;
    this.cargaForm(this.experiencia);
  }

  onEnviar() {  // CON EL CLICK DEL BOTON ABM o CRUD
    let experiencia: Experiencia = this.form.value; // Tomo valores del formulario
    //console.log(experiencia);
    if (this.mensajeBoton=="Alta") { // SI ES UN ALTA
      this.datosPortfolio.crearExperiencia(experiencia).subscribe(  //AGREGA EN BD Y TRAE NUEVA EXPERIENCIA 
        (newExperiencia: Experiencia) => {
          this.experiencialist.push(newExperiencia); // AGREGA AL ARRAY
        }
      );
      Swal.fire({   // ventanita de confirmación Alta
        position: 'center',
        icon: 'success',
        title: 'La experiencia ' + experiencia.empresa + ' ha sido agregada.',
        showConfirmButton: false,
        timer: 2000
      })
    } 
    else {    
        if (this.mensajeBoton=="Modificación") {   // SI ES MODIFICACION
          // console.log("Estamos en la modificación");
          Swal.fire({ // Consulta al Usuario
            title: 'Desea realizar los cambios en la experiencia '+ experiencia.empresa + ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#6daf17',
            denyButtonColor: '#2c5e19' ,
            cancelButtonColor: '#af4808',
            confirmButtonText: 'Guardar',
            denyButtonText: `No Guardar`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.datosPortfolio.modificarExperiencia(experiencia).subscribe(  // Modifica la BD
                () => {
              this.cargarArray(); // ACTUALIZA EL ARRAY de Experiencias
            })
            Swal.fire({   // Ventanita de Confirmación Modificación
              position: 'center',
              icon: 'success',
              title: 'La experiencia ' + experiencia.empresa + ' ha sido modificada.',
              showConfirmButton: false,
              timer: 2000})
            } else if (result.isDenied) {   // Ventanita de confirmación de NO Modificación
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Los cambios en la experiencia ' + experiencia.empresa + ' NO fueron guardados.',
                showConfirmButton: false,
                timer: 2000})
            }
          })
        }
        else {  // SI ES UNA BAJA
          //console.log("Estamos en la baja");
          Swal.fire({   // Cosnulta al Usuario
            title: 'Está seguro?',
            text: "Usted está por eliminar la Experiencia " + experiencia.empresa,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6daf17',
            cancelButtonColor: '#2c5e19',
            confirmButtonText: 'Sí, Eliminar!'
          }).then((result) => {   
            if (result.isConfirmed) {
              this.datosPortfolio.borrarExperiencia(experiencia.id).subscribe(  // Borra en BD
              () => {
              this.cargarArray();  } )    // Actualiza el ARRRAY Experiencias
              Swal.fire({   // Ventanita de Confirmación Baja
                position: 'center',
                icon: 'success',
                title: 'La experiencia ' + experiencia.empresa + ' ha sido borrada.',
                showConfirmButton: false,
                timer: 2000})
            } }) } }
    this.cierraModal();
  }

  abreModal(){
    this.modalSwitch=true;
  }
  
  cierraModal(){
    this.modalSS.$modal.emit(false);
  }

  private limpiaForm() {
    this.form.setValue({
      id:0,
      empresa:'',
      puesto:'',
      contacto:'',
      tarea:'',        
      fechini:'',
      fechfin:''
    })
  }

  private cargaForm(escuela: Experiencia) {
    this.form.setValue({
      id:escuela.id,
      empresa:this.experiencia.empresa,
      puesto:this.experiencia.puesto,
      contacto:this.experiencia.contacto,
      tarea:this.experiencia.tarea,        
      fechini:this.experiencia.fechini,
      fechfin:this.experiencia.fechfin
    })  }
}
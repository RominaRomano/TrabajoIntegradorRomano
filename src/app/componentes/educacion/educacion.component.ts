import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; // Control de formulario CRUD
import { PortfolioService } from 'src/app/servicios/portfolio.service'; // Trae datos
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import { SwitchService } from 'src/app/servicios/switch.service'; // Apertura y cierre del Modal
import { Educacion } from 'src/app/data/Educacion';  // Interfaz para Tipo Educación
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  
  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  educacionlist:Educacion[]=[];
  educacion:any;
  form:FormGroup;
  mensajeBoton:string="";
  public baja:boolean=false;

  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder, private modalSS:SwitchService, private autService:AutenticacionService) {
    this.form=this.formBuilder.group(
    {
      id:[0,[Validators.nullValidator]],
      logo:['',[Validators.nullValidator]],
      nombre:['',[Validators.required]],
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.nullValidator]],        
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
    this.datosPortfolio.obtenerDatosEducacion().subscribe(datos=>{
      this.educacionlist = datos;});
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
    this.educacion = this.educacionlist[i];
    this.mensajeBoton="Modificación";
    this.baja=false;
    this.cargaForm(this.educacion);
  }

  Baja(i: number) {
    this.abreModal();
    this.educacion = this.educacionlist[i];
    this.mensajeBoton="Baja";
    this.baja=true;
    this.cargaForm(this.educacion);
  }

  onEnviar() {  // CON EL CLICK DEL BOTON ABM o CRUD
    let educacion: Educacion = this.form.value; // Tomo valores del formulario
    //console.log(educacion);
    if (this.mensajeBoton=="Alta") { // SI ES UN ALTA
      this.datosPortfolio.crearEducacion(educacion).subscribe(  //AGREGA EN BD Y TRAE NUEVA EDUCACION
        (newEducation: Educacion) => {
          this.educacionlist.push(newEducation); // AGREGA AL ARRAY
        }
      );
      Swal.fire({   // ventanita de confirmación Alta
        position: 'center',
        icon: 'success',
        title: 'La escuela ' + educacion.nombre + ' ha sido agregada.',
        showConfirmButton: false,
        timer: 2000
      })
    } 
    else {    
        if (this.mensajeBoton=="Modificación") {   // SI ES MODIFICACION
          //console.log("Estamos en la modificación");
          Swal.fire({       //Consulta al Usuario
            title: 'Desea realizar los cambios en la escuela '+educacion.nombre+ ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#6daf17',
            denyButtonColor: '#2c5e19' ,
            cancelButtonColor: '#af4808',
            confirmButtonText: 'Guardar',
            denyButtonText: `No Guardar`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.datosPortfolio.modificarEducacion(educacion).subscribe( //Modifica la BD
                () => {
              this.cargarArray(); // ACTUALIZA EL ARRAY de Educación
            })
            Swal.fire({   // ventanita de confirmación Modificación
              position: 'center',
              icon: 'success',
              title: 'La escuela ' + educacion.nombre + ' ha sido modificada.',
              showConfirmButton: false,
              timer: 2000})
            } else if (result.isDenied) {   // ventanita de confirmación de NO Modificación
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Los cambios en la escuela ' + educacion.nombre + ' NO fueron guardados.',
                showConfirmButton: false,
                timer: 2000})
            } })  }
        else {  // SI ES UNA BAJA
          //console.log("Estamos en la baja");
          Swal.fire({     // Consulta al Usuario
            title: 'Está seguro?',
            text: "Usted está por eliminar la Escuela " + educacion.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6daf17',
            cancelButtonColor: '#2c5e19',
            confirmButtonText: 'Sí, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.datosPortfolio.borrarEducacion(educacion.id).subscribe(    // Elimina en la BD
              () => {
              this.cargarArray();  } )    // Acyauliza el ARRAY de Educación
              Swal.fire({   // Ventanita de Confirmación Baja
                position: 'center',
                icon: 'success',
                title: 'La escuela ' + educacion.nombre + ' ha sido borrada.',
                showConfirmButton: false,
                timer: 2000})
            }
          })
        }
      }
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
      logo:'',
      nombre:'',
      titulo:'',
      descripcion:'',        
      fechini:'',
      fechfin:''
    })
  }

  private cargaForm(escuela: Educacion) {
    this.form.setValue({
      id:escuela.id,
      logo:escuela.logo,
      nombre:escuela.nombre,
      titulo:escuela.titulo,
      descripcion:escuela.descripcion,        
      fechini:escuela.fechini,
      fechfin:escuela.fechfin
    })
  }
}
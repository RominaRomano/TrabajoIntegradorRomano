import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; // Control de formulario CRUD
import { PortfolioService } from 'src/app/servicios/portfolio.service'; // Trae datos
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import { SwitchService } from 'src/app/servicios/switch.service'; // Apertura y cierre del Modal
import { Proyecto } from 'src/app/data/Proyecto';  // Interfaz para Tipo Proyecto
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  
  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  proyectolist:Proyecto[]=[];
  proyecto:any;
  form:FormGroup;
  mensajeBoton:string="";
  public baja:boolean=false;

  constructor(private datosPortfolio:PortfolioService, private formBuilder:FormBuilder, private modalSS:SwitchService, private autService:AutenticacionService) {
    this.form=this.formBuilder.group(
    {
      id:[0,[Validators.nullValidator]],
      imagen:['',[Validators.nullValidator]],
      nombre:['',[Validators.required]],
      rutafrontend:['',[Validators.required]],
      rutabackend:['',[Validators.required]],
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
    this.datosPortfolio.obtenerDatosProyecto().subscribe(datos=>{
      this.proyectolist = datos;});
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
    this.proyecto = this.proyectolist[i];
    this.mensajeBoton="Modificación";
    this.baja=false;
    this.cargaForm(this.proyecto);
  }

  Baja(i: number) {
    this.abreModal();
    this.proyecto = this.proyectolist[i];
    this.mensajeBoton="Baja";
    this.baja=true;
    this.cargaForm(this.proyecto);
  }

  onEnviar() {  // CON EL CLICK DEL BOTON ABM o CRUD
    let proyecto: Proyecto = this.form.value; // Tomo valores del formulario
    console.log(proyecto);
    if (this.mensajeBoton=="Alta") { // SI ES UN ALTA
      console.log("Estamos en el alta");
      this.datosPortfolio.crearProyecto(proyecto).subscribe(  //AGREGA EN BD Y TRAE NUEVA EDUCACION
        (newProyecto: Proyecto) => {
          this.proyectolist.push(newProyecto); // AGREGA AL ARRAY de Proyectos
        }
      );
      Swal.fire({   // ventanita de confirmación Alta
        position: 'center',
        icon: 'success',
        title: 'El proyecto ' + proyecto.nombre + ' ha sido agregado.',
        showConfirmButton: false,
        timer: 2000
      })
    } 
    else {    
        if (this.mensajeBoton=="Modificación") {   // SI ES MODIFICACION
          console.log("Estamos en la modificación");
          Swal.fire({   // Consulta al Usuario
            title: 'Desea realizar los cambios en el proyecto '+proyecto.nombre+ ' ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#6daf17',
            denyButtonColor: '#2c5e19' ,
            cancelButtonColor: '#af4808',
            confirmButtonText: 'Guardar',
            denyButtonText: `No Guardar`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.datosPortfolio.modificarProyecto(proyecto).subscribe(    // Modifica en BD
                () => {
              this.cargarArray(); // ACTUALIZA EL ARRAY de proyectos
            })
            Swal.fire({   // ventanita de confirmación Modificación
              position: 'center',
              icon: 'success',
              title: 'El proyecto ' + proyecto.nombre + ' ha sido modificado.',
              showConfirmButton: false,
              timer: 2000})
            } else if (result.isDenied) {
              Swal.fire({   // ventanita de confirmación NO Modificación
                position: 'center',
                icon: 'info',
                title: 'Los cambios en el proyecto ' + proyecto.nombre + ' NO fueron guardados.',
                showConfirmButton: false,
                timer: 2000})
            }
          })
        }
        else {  // SI ES UNA BAJA
          console.log("Estamos en la baja");
          Swal.fire({   // Consulta al Usuario
            title: 'Está seguro?',
            text: "Usted está por eliminar el Proyecto " + proyecto.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6daf17',
            cancelButtonColor: '#2c5e19',
            confirmButtonText: 'Sí, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {   // Elimina en la BD
              this.datosPortfolio.borrarProyecto(proyecto.id).subscribe(
              () => {
              this.cargarArray();  } )    // Actualiza ARRAY de proyectos
              
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'El proyecto ' + proyecto.nombre + ' ha sido borrado.',
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
      imagen:'',
      nombre:'',
      rutafrontend:'',
      rutabackend:'',
      descripcion:'',        
      fechini:'',
      fechfin:''
    })
  }

  private cargaForm(proyecto: Proyecto) {
    this.form.setValue({
      id:proyecto.id,
      imagen:proyecto.imagen,
      nombre:proyecto.nombre,
      rutafrontend:proyecto.rutafrontend,
      rutabackend:proyecto.rutabackend,
      descripcion:proyecto.descripcion,        
      fechini:proyecto.fechini,
      fechfin:proyecto.fechfin
    })
  }
}
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service'; // Trae datos
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import { SwitchService } from 'src/app/servicios/switch.service'; // Apertura y cierre del Modal
import { Habilidad } from 'src/app/data/Habilidad';  // Interfaz para Tipo Habilidad
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  modalSwitch:boolean=false;
  UsuaLog:boolean=false;
  public baja:boolean=false;
  public alta:boolean=false;
  error:boolean=false;
  muestraHabilidad:Habilidad[]=[];
  habilidadlist:Habilidad[]=[];
  habilidad:Habilidad={"id":0,"icono":"","nombre":"","porcentaje":""};
  mensajeBoton:string="";
  nuevoPorcentaje:string="";
  nuevoIcono:string="";
  nuevoNombre:string="";
  habilnueva:any;
  habilidadtodas:any[]=[    // Habilidades Duras
                        {"icono":"fab fa-angular",            "nombre":"Angular"},
                        {"icono":"fab fa-bootstrap",          "nombre":"BootStrap"},
                        {"icono":"fab fa-css3-alt",           "nombre":"CSS 3"},
                        {"icono":"fas fa-database",           "nombre":"DataBase"},
                        {"icono":"fab fa-github",             "nombre":"GitHub"},
                        {"icono":"fab fa-html5",              "nombre":"HTML 5"},    
                        {"icono":"fab fa-java",               "nombre":"Java"},
                        {"icono":"fab fa-js-square",          "nombre":"JS Square"},    
                        {"icono":"fab fa-node-js",            "nombre":"Node JS"},
                        {"icono":"fab fa-php",                "nombre":"PHP"},
                        {"icono":"fab fa-python",             "nombre":"Python"},
                            // Habilidades Blandas
                        {"icono":"fas fa-grin-alt",           "nombre":"* Actitud Positiva"},
                        {"icono":"fas fa-book-reader",        "nombre":"* Autodidacta"},
                        {"icono":"fas fa-lightbulb",          "nombre":"* Creatividad"},
                        {"icono":"fas fa-hourglass-half",     "nombre":"* Gestión del Tiempo"},
                        {"icono":"fas fa-flag-usa",           "nombre":"* Idioma Inglés"},
                        {"icono":"fas fa-hand-holding-heart", "nombre":"* Inteligencia Emocional"},
                        {"icono":"fas fa-users",              "nombre":"* Liderzgo"},
                        {"icono":"fas fa-square-root-alt",    "nombre":"* Matemáticas"},
                        {"icono":"fas fa-people-carry",       "nombre":"* Trabajo en Equipo"}];

  constructor(private datosPortfolio:PortfolioService, private modalSS:SwitchService, private autService:AutenticacionService) { }

  ngOnInit(): void {
    this.cargarArray();
    this.UsuaLog = this.autService.UsuarioLoggeado();
    this.modalSS.$modal.subscribe((valor)=> {this.modalSwitch=valor});
  }

  public  colorConic(porcentaje:string){
    return `conic-gradient(#e47711 ${porcentaje},#f7bc7a ${porcentaje})`;
  }

  private cargarArray() {  // ACTUALIZA EL ARRAY CON LOS CAMBIOS
    this.datosPortfolio.obtenerDatosHabilidad().subscribe(datos=>{
      this.habilidadlist=datos;
      //console.log(datos);
  })}

  Alta() {
    this.abreModal();
    // Filtrar en muestraHabilidad
    this.muestraHabilidad.splice(0,this.muestraHabilidad.length); // Limpia matriz de selección
    let existe:boolean;
    let posicion:number=-1;
    for (let habil of this.habilidadtodas) { // Por cada elemento que se pueda agregar
      existe=false;
      posicion+=1;
      for (let habilList of this.habilidadlist) { // Busca en la base de datos o sea en la vista
        if (habil.icono == habilList.icono) {
          existe=true;
        }
      }
      if (!existe) {this.muestraHabilidad.push(this.habilidadtodas[posicion])} // sólo permite elegir los que aun no están agregados
    }
    // prepara variables para alta
    this.nuevoNombre="";
    this.nuevoPorcentaje="";
    this.alta=true;
    this.baja=false;
    this.mensajeBoton="Alta";
  }

  Modificacion(i: number) {
    this.abreModal();
    // prepara variables para Modificación
    this.mensajeBoton="Modificación";
    this.alta=false;
    this.baja=false;
    this.cargaForm(i);
  }

  Baja(i: number) {
    this.abreModal();
    // prepara variables para Baja
    this.mensajeBoton="Baja";
    this.baja=true;
    this.alta=false;
    this.cargaForm(i);
  }

  onEnviar() {  // CON EL CLICK DEL BOTON ABM o CRUD
    this.error=false;
    for (let habil of this.habilidadtodas) { // recupera el valor del icono para completar el objeto
      if (this.nuevoNombre == habil.nombre) {
        this.nuevoIcono=habil.icono;
      }
    }
    // carga el nuevo objeto
    let habilNueva:Habilidad = {"id":this.habilidad.id,"icono":this.nuevoIcono,"nombre":this.nuevoNombre,"porcentaje":this.nuevoPorcentaje}; // Tomo valores del formulario
    // verifica que ambos elementos estén cargados
    if (habilNueva.icono=="" || habilNueva.porcentaje==""){
      this.ventanaError();
    }
    else {
      if (this.mensajeBoton=="Alta") { // SI ES UN ALTA
        //console.log("Estamos en el Alta");
        //console.log(habilNueva);
          this.datosPortfolio.crearHabilidad(habilNueva).subscribe(  //AGREGA EN BD Y TRAE NUEVA EDUCACION
          (newHabilidad: Habilidad) => {
            this.habilidadlist.push(newHabilidad); // AGREGA AL ARRAY
          } );
          Swal.fire({   // ventanita de confirmación Alta
            position: 'center',
            icon: 'success',
            title: 'La habilidad ' + habilNueva.nombre + ' ha sido agregada.',
            showConfirmButton: false,
            timer: 2000
          })
        }
      else {    
          if (this.mensajeBoton=="Modificación") {   // SI ES MODIFICACION
            //console.log("Estamos en la modificación");
            //console.log(habilNueva);
              Swal.fire({   // Consulta al Usuario
              title: 'Desea realizar los cambios en la habilidad '+habilNueva.nombre+ ' ?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonColor: '#6daf17',
              denyButtonColor: '#2c5e19' ,
              cancelButtonColor: '#af4808',
              confirmButtonText: 'Guardar',
              denyButtonText: `No Guardar`,
            }).then((result) => {
              if (result.isConfirmed) { 
                this.datosPortfolio.modificarHabilidad(habilNueva).subscribe(   // Modifica la BD
                  () => {
                this.cargarArray(); // ACTUALIZA EL ARRAY de Habilidades
              })
              Swal.fire({   // Ventanita confirmación Modificación
                position: 'center',
                icon: 'success',
                title: 'La habilidad ' + habilNueva.nombre + ' ha sido modificada.',
                showConfirmButton: false,
                timer: 2000})
              } else if (result.isDenied) {
                Swal.fire({   // Ventanita confirmación de NO Modificación
                  position: 'center',
                  icon: 'info',
                  title: 'Los cambios en la habilidad ' + habilNueva.nombre + ' NO fueron guardados.',
                  showConfirmButton: false,
                  timer: 2000})
              }  })  }  
          else {  // SI ES UNA BAJA
            //console.log("Estamos en la baja");
            //console.log(habilNueva);
            Swal.fire({   // Consulta al Usuario
              title: 'Está seguro?',
              text: "Usted está por eliminar la habilidad " + habilNueva.nombre,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#6daf17',
              cancelButtonColor: '#2c5e19', 
              confirmButtonText: 'Sí, Eliminar!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.datosPortfolio.borrarHabilidad(habilNueva.id).subscribe(   // Elimina en BD
                () => {
                this.cargarArray();  } )    // Actualiza ARRAY de Habilidades
                Swal.fire({   // Ventanita confirmación Baja
                  position: 'center',
                  icon: 'success',
                  title: 'La habilidad ' + habilNueva.nombre + ' ha sido borrada.',
                  showConfirmButton: false,
                  timer: 2000})
              }
            })
          }
      }
    } 
    if (!this.error){this.cierraModal();}
  }

  abreModal(){
    this.modalSwitch=true;
  }
  
  cierraModal(){
    this.modalSS.$modal.emit(false);
  }

  ventanaError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Debe elegir Habilidad y Porcentaje.',
      showConfirmButton: false,
      timer: 2000 })
      this.error=true;
  }

  private cargaForm(i:number) {
    this.habilidad = this.habilidadlist[i];
    this.nuevoNombre=this.habilidad.nombre;
    //console.log("carga Nombre: " +this.nuevoNombre);  
    this.nuevoPorcentaje=this.habilidad.porcentaje;
    //console.log("carga Porcentaje: " +this.nuevoPorcentaje);  
  }
}
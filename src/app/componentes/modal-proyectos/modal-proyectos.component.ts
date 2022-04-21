import { Component, Input, OnInit } from '@angular/core';
import { SwitchService } from 'src/app/servicios/switch.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; /**/

@Component({
  selector: 'app-modal-proyectos',
  templateUrl: './modal-proyectos.component.html',
  styleUrls: ['./modal-proyectos.component.css']
})
export class ModalProyectosComponent implements OnInit {  
  form:FormGroup;
  @Input() proceso:string="";
  @Input() proyecto:any;
  
  mensajeBoton:string="";

  nombre: string="";
  imagen: string="";
  refboton: string="";
  descripcion: string="";
  fechini: string="";
  fechfin: string="";
  
  baja:boolean=false;
  
  constructor(private modalSS:SwitchService, private formBuilder:FormBuilder) { /**/
    this.form=this.formBuilder.group(
      {
        imagen:['',[Validators.nullValidator]],
        nombre:['',[Validators.required]],
        refboton:['',[Validators.required]],
        descripcion:['',[Validators.nullValidator]],        
        fechini:['',[Validators.required]],
        fechfin:['',[Validators.required]]
      });
  }

  ngOnInit(): void {
    //console.log(this.proceso);
    this.mensajeBoton="Confirmar "+this.proceso+" de Escuela";
    if(this.proceso!="Alta"){
      this.nombre=this.proyecto.nombre;
      this.imagen=this.proyecto.imagen;
      this.descripcion=this.proyecto.descripcion;
      this.refboton=this.proyecto.refboton;
      this.fechini=this.proyecto.fechini;
      this.fechfin=this.proyecto.fechfin;
      //console.log(this.proyecto.nombre);
      if(this.proceso=="Baja"){
        this.baja=true;
      }
    }
  }

  cierraModal(){
    this.modalSS.$modal.emit(false);
  }

  ventanaConfirma(){
      Swal.fire({
        icon: 'success',
        title: 'Confirmado!!',
        text: 'Su '+this.proceso+' se ha generado con éxito!!',
      })
/*      Swal.fire({
        icon: 'error',
        title: 'Problemas!!',
        text: 'No fue posible realizar su '+this.proceso+' !!',
      })*/
}


/*  get Usuario()
  {return this.form.get('nombre');}

  get Password()
  {return this.form.get('password');}*/

  onEnviar(event:Event){
    event.preventDefault;
    /*this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA"+JSON.stringify(data));
      this.rutas.navigate(['/app-component'])
    })*/
  }
}

/*import {Router} from '@angular/router';
import {AutenticacionService} from 'src/app/servicios/autenticacion.service';
declare var ventana3:any;*/


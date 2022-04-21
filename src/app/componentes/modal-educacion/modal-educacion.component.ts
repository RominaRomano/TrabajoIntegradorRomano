import { Component, Input, OnInit } from '@angular/core';
import { SwitchService } from 'src/app/servicios/switch.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; /**/

@Component({
  selector: 'app-modal-educacion',
  templateUrl: './modal-educacion.component.html',
  styleUrls: ['./modal-educacion.component.css']
})
export class ModalEducacionComponent implements OnInit {
  form:FormGroup;
  @Input() proceso:string="";
  @Input() escuela:any;
  
  mensajeBoton:string="";
  
  nombre: string="";
  logo: string="";
  titulo: string="";
  descripcion: string="";
  fechini: string="";
  fechfin: string="";
  
  baja:boolean=false;
  
  constructor(private modalSS:SwitchService, private formBuilder:FormBuilder) { /**/
    this.form=this.formBuilder.group(
      {
        logo:['',[Validators.nullValidator]],
        nombre:['',[Validators.required]],
        titulo:['',[Validators.required]],
        descripcion:['',[Validators.nullValidator]],        
        fechini:['',[Validators.required]],
        fechfin:['',[Validators.required]]
      });
  }

  ngOnInit(): void {
    //console.log(this.proceso);
    this.mensajeBoton="Confirmar "+this.proceso+" de Escuela";
    if(this.proceso!="Alta"){
      this.nombre=this.escuela.nombre;
      this.titulo=this.escuela.titulo;
      this.descripcion=this.escuela.descripcion;
      this.logo=this.escuela.logo;
      this.fechini=this.escuela.fechini;
      this.fechfin=this.escuela.fechfin;
      //console.log(this.escuela.nombre);
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


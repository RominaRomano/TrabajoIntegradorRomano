import { Component, OnInit } from '@angular/core';
import { SwitchService } from 'src/app/servicios/switch.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AutenticacionService} from 'src/app/servicios/autenticacion.service';

/*declare var ventana3:any;*/

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  form: FormGroup;
  constructor(private modalSS:SwitchService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService, private rutas:Router) {
    this.form=this.formBuilder.group(
      {
      nombre:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]});
  }

  ngOnInit(): void {
  }

  cierraModal(){
    this.modalSS.$modal.emit(false);
  }

  
  ventanaConfirma(errorUser:any,errorPass:any){
    if(!errorUser && !errorPass){
      Swal.fire({
        icon: 'success',
        title: 'Confirmado!!',
        text: 'Bienvenido al Area Administrativa!!',
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Verifique....',
        text: 'Haber ingresado todos los datos',
      })
    }
/*      Swal.fire({
      icon: 'error',
      title: 'Problemas!!',
      text: 'Usted no está resgistrado como Administrador/a',
    })*/
}


  get Usuario()
  {return this.form.get('nombre');}

  get Password()
  {return this.form.get('password');}

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA"+JSON.stringify(data));
      this.rutas.navigate(['/app-component'])
    })
  }
}

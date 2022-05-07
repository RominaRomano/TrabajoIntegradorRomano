import { Component, OnInit } from '@angular/core';
//import { SwitchService } from 'src/app/servicios/switch.service';
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
  constructor(private formBuilder:FormBuilder, private autenticacionService:AutenticacionService, private rutas:Router) {
    this.form=this.formBuilder.group(
      {
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]});
  }

  ngOnInit(): void {
  }

  ventanaError(){
      Swal.fire({
        icon: 'error',
        title: 'Verifique....',
        text: 'Haber ingresado todos los datos y de forma correcta.',
      })
    }

  get Email()
  {return this.form.get('email');}

  get Password()
  {return this.form.get('password');}

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(
    (response: Boolean) => {
      if (response)
        this.rutas.navigate(['/home']);
      else
        Swal.fire({
          icon: 'error',
          title: 'Atención!',
          text: 'Las credenciales ingresadas no existen en nuestros registros.',
        })
    });
  }
}
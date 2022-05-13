import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';   // Control de Rutas
import {FormBuilder, FormGroup, Validators} from '@angular/forms';  // Control de Formularios
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';  // Informa sobre login
import Swal from 'sweetalert2'; // Mensajes al Usuario
import 'sweetalert2/src/sweetalert2.scss';  // Mensajes al Usuario

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

  ngOnInit(): void {}

  get Email()
  {return this.form.get('email');}

  get Password()
  {return this.form.get('password');}

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(   // Envía las credenciales a valorar
    (response: Boolean) => {
      if (response)   // si las credenciales fueron correctas
        this.rutas.navigate(['/home']);   // redirige al portfolio con usuario loggeado
      else
        Swal.fire({   // Mensaje de Error
          icon: 'error',
          title: 'Atención!',
          text: 'Las credenciales ingresadas no existen en nuestros registros.',
        })
    });
  }
}
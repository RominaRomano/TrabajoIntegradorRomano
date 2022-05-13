import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../data/config/Config';
import { LoginDto } from '../data/LoginDto';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {

  constructor(private http: HttpClient) {/*console.log("El servicio de autenticación está corriendo")*/;}

  public IniciarSesion(credentials:LoginDto) : Observable<Boolean> {
    return this.http.post<Boolean>(config.url + "iniciar-sesion", credentials).pipe(  // Envía credenciales a Back-End
      tap((response: Boolean) => {
        if (response)   // Si las credenciales fueron correctas
          sessionStorage.setItem("UsuaLog", "true");  // Cambia el valor de la bandera UsuaLog (permitiendo así botnones de Edición)
      })
    );
  }
  
  public UsuarioLoggeado():boolean {
    return sessionStorage.getItem("UsuaLog") !== null;
  }

  public logout() {
    sessionStorage.removeItem("UsuaLog");
  }
}
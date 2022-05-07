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

  constructor(private http: HttpClient) {console.log("El servicio de autenticación está corriendo");}

  public IniciarSesion(credentials:LoginDto) : Observable<Boolean> {
    return this.http.post<Boolean>(config.baseUrl + "iniciar-sesion", credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("UsuaLog", "true");
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
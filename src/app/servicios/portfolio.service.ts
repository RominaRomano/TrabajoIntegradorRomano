import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../data/config/Config';
import { Educacion } from '../data/Educacion';
import { Experiencia } from 'src/app/data/Experiencia';
import { Habilidad } from 'src/app/data/Habilidad';
import { Proyecto } from 'src/app/data/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatosPersona(): Observable<any> {
    return this.http.get<any>(config.baseUrl + "ver/personas");
  }

 obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>(config.baseUrl + "ver/experiencias");
  }
  
  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>(config.baseUrl + "ver/educaciones");
  }

  obtenerDatosHabilidad(): Observable<Habilidad[]> {
    return this.http.get<any>(config.baseUrl + "ver/habilidades");
  }
  
 obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.baseUrl + "ver/proyectos");
  }
}
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

  // CARGA DEL PORTFOLIO
  obtenerDatosPersona(): Observable<any> {
    return this.http.get<any>(config.url + "ver/personas");
  }
 obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>(config.url + "ver/experiencias");
  }
  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>(config.url + "ver/educaciones");
  }
  obtenerDatosHabilidad(): Observable<Habilidad[]> {
    return this.http.get<any>(config.url + "ver/habilidades");
  }
 obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.url + "ver/proyectos");
  }

  // CRUD PERSONA
  modificarPersona(persona:any): Observable<any> {
    return this.http.put<any>(config.url + "modificar/persona", persona);
  }

  // CRUD EXPERIENCIAS
  crearExperiencia(experiencia:Experiencia): Observable<Experiencia> {
    return this.http.post<any>(config.url + "new/experiencia", experiencia);
  }
  modificarExperiencia(experiencia:Experiencia): Observable<Experiencia> {
    return this.http.put<any>(config.url + "modificar/experiencia", experiencia);
  }
  borrarExperiencia(id:number): Observable<Experiencia> {
    return this.http.delete<any>(config.url + "delete/experiencia/"+id);
  }

  // CRUD EDUCACIÓN
  crearEducacion(escuela:Educacion): Observable<Educacion> {
    return this.http.post<any>(config.url + "new/educacion", escuela);
  }
  modificarEducacion(escuela:Educacion): Observable<Educacion> {
    return this.http.put<any>(config.url + "modificar/educacion", escuela);
  }
  borrarEducacion(id:number): Observable<Educacion> {
    return this.http.delete<any>(config.url + "delete/educacion/"+id);
  }
  
  // CRUD HABILIDADES
  crearHabilidad(habilidad:Habilidad): Observable<Habilidad> {
    return this.http.post<any>(config.url + "new/habilidad", habilidad);
  }
  modificarHabilidad(habilidad:Habilidad): Observable<Habilidad> {
    return this.http.put<any>(config.url + "modificar/habilidad", habilidad);
  }
  borrarHabilidad(id:number): Observable<Habilidad> {
    return this.http.delete<any>(config.url + "delete/habilidad/"+id);
  }

  // CRUD PROYECTOS
  crearProyecto(proyecto:Proyecto): Observable<Proyecto> {
    return this.http.post<any>(config.url + "new/proyecto", proyecto);
  }
  modificarProyecto(proyecto:Proyecto): Observable<Proyecto> {
    return this.http.put<any>(config.url + "modificar/proyecto", proyecto);
  }
  borrarProyecto(id:number): Observable<Proyecto> {
    return this.http.delete<any>(config.url + "delete/proyecto/"+id);
  }
}
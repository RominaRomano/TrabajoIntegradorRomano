import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PortfolioService } from './servicios/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutenticacionService } from './servicios/autenticacion.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalEducacionComponent } from './componentes/modal-educacion/modal-educacion.component';
import { ModalExperienciaComponent } from './componentes/modal-experiencia/modal-experiencia.component';
import { ModalHabilidadesComponent } from './componentes/modal-habilidades/modal-habilidades.component';
import { ModalProyectosComponent } from './componentes/modal-proyectos/modal-proyectos.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    ModalLoginComponent,
    ModalEducacionComponent,
    ModalExperienciaComponent,
    ModalHabilidadesComponent,
    ModalProyectosComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PortfolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

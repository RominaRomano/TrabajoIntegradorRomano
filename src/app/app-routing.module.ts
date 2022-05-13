import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
 
const routes: Routes = [
{path: 'home', component: PortfolioComponent },   // Dirige mediante la Url al Portfolio
{path: 'login', component: ModalLoginComponent},  // Dirige mediante la Url al Login
{path: '', redirectTo: '/home', pathMatch:'full'},  // Dirige mediante la Url vacía al Portfolio
{ path: '**', redirectTo: '/home'}    // Dirige mediante la cualquier Url no conocida al Portfolio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
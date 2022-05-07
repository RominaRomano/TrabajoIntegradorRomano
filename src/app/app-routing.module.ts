import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
 
const routes: Routes = [
{path: 'home', component: PortfolioComponent },
{path: 'login', component: ModalLoginComponent},
{path: '', redirectTo: '/home', pathMatch:'full' },
{ path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

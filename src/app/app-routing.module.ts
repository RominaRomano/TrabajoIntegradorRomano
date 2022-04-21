import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
 
const routes: Routes = [
  {path:'#', component:AppComponent},
  {path:'modal-login', component:ModalLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

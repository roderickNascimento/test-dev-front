import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarroComponent } from './carro/carro.component';


const routes: Routes = [
  {
    path: '**',
    component: CarroComponent,
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
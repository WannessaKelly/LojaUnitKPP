import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteNovoComponent } from './cliente-novo/cliente-novo.component';


const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'detalhe-clientes', component: ClientesComponent },
  { path: 'delete', component: ClientesComponent },
   { path: 'novoCliente', component: ClienteNovoComponent },
  
  
];

@NgModule({
  declarations: [],
  imports: [
    //CommonModule,
    RouterModule.forRoot(routes)],
     exports: [RouterModule]
  
})
export class AppRoutingModule { }

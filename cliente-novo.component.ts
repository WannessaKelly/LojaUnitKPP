import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Clientes';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent implements OnInit {
 clientes: Cliente[];
   
  

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(h => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

  add(nome: string, cpf: string, email: string, dataNascimento: Date, sexo: string,
      nomeSocial: string, apelido: string, telefone: string): void {
        console.log(nome, cpf,email, dataNascimento, sexo, nomeSocial, apelido, telefone);
    nome = nome.trim();
    cpf = cpf.trim();
    email = email.trim();
    if (!nome && !cpf && !email) { return;}

    this.clienteService.addCliente({nome, cpf, email, dataNascimento: new Date(dataNascimento), sexo, nomeSocial,
      // tslint:disable-next-line:no-shadowed-variable
      apelido, telefone} as Cliente).subscribe(Cliente => {this.clientes.push(Cliente);
      });
  }

}
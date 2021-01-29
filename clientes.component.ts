import { Component, OnInit } from '@angular/core';
import {Cliente} from '../clientes';
import { ClienteService } from '../cliente.service';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
clientes: Cliente[];
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
    this.getClienteLista();
    
  }

  delete(cliente:Cliente):void{
    this.clienteService.deleteCliente(cliente).subscribe();
  }
  
  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  getClienteLista(): void {
    this.clienteService.getClienteLista()
      .subscribe(clientes => this.clientes = clientes);
  }

  add(nome: string, cpf: string, email: string, dataNascimento: Date, sexo: string, nomeSocial: string, apelido: string, telefone: string): void {
    nome = nome.trim();
    cpf = cpf.trim();
    email = email.trim();
    sexo = sexo.trim();
    telefone = telefone.trim();
    dataNascimento = dataNascimento;
    nomeSocial = nomeSocial.trim();
    apelido = apelido.trim();
    if (!nome && !cpf && !email) {
      return;
    }
    this.clienteService.addCliente({ nome, cpf, email, dataNascimento: new Date(dataNascimento), sexo, nomeSocial, apelido, telefone } as Cliente).subscribe((cliente) => {
      this.clientes.push(cliente);
    });
  }
}

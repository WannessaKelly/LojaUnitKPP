package com.basica.ProjetoKellyLojaUnit;


import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;


@Entity 
@Table (name="clientes")

public class Cliente {
	
	  @Id
	  @GeneratedValue(strategy =  GenerationType.AUTO)
	    private Integer id;
		private String nome;
		private String nome_social;
		private String apelido;	
		private Date data_nascimento;
		private String sexo;
		private String telefone;
		private String cpf;
		private String email;
			
		
		public Integer getIdCliente() {
			return id;
		}
		public void setIdCliente(Integer idCliente) {
			this.id = idCliente;
		}
		public String getNome() {
			return nome;
		}
		public void setNome(String nome) {
			this.nome = nome;
		}
		public String getNomeSocial() {
			return nome_social;
		}
		public void setNomeSocial(String nomeSocial) {
			this.nome_social = nomeSocial;
		}
		public String getApelido() {
			return apelido;
		}
		public void setApelido(String apelido) {
			this.apelido = apelido;
		}
		public Date getDataNasc() {
			return data_nascimento;
		}
		public void setDataNasc(Date dataNasc) {
			this.data_nascimento = dataNasc;
		}
		public String getSexo() {
			return sexo;
		}
		public void setSexo(String sexo) {
			this.sexo = sexo;
		}
		public String getFone() {
			return telefone;
		}
		public void setFone(String fone) {
			this.telefone = fone;
		}
		public String getCpf() {
			return cpf;
		}
		public void setCpf(String cpf) {
			this.cpf = cpf;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public Date getDataNascimento() {
			return data_nascimento;
		}
		public void setDataNascimento(Date dataNascimento) {
			this.data_nascimento = dataNascimento;
		}
		public String getTelefone() {
			return telefone;
		}
		public void setTelefone(String telefone) {
			this.telefone = telefone;
		}
				
}

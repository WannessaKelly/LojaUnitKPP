import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Cliente } from './Clientes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'http://localhost:8080/clientes';  // url to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Clientes from the server */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
      .pipe(
        tap(_ => this.log('fetched Clientes')),
        catchError(this.handleError<Cliente[]>('getClientes', []))
      );
  }
  getClienteLista(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }
  /** GET Cliente by id. Return `undefined` when id not found */
  getClienteNo404<Data>(id: number): Observable<Cliente> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<Cliente[]>(url)
      .pipe(
        map(Clientes => Clientes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Cliente id=${id}`);
        }),
        catchError(this.handleError<Cliente>(`getCliente id=${id}`))
      );
  }
  getClienteById(id: number): Observable<Cliente> {
    const url = `${this.url}/find/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap((_) => this.log(`cliente recuperado id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
    }
  /** GET Cliente by id. Will 404 if id not found */
  getCliente(id: number): Observable<Cliente> {
    const url = `${this.url}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => this.log(`fetched Cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  /* GET Clientes whose name contains search term */
  searchClientes(term: string): Observable<Cliente[]> {
    if (!term.trim()) {
      // if not search term, return empty Cliente array.
      return of([]);
    }
    return this.http.get<Cliente[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Clientes matching "${term}"`) :
         this.log(`no Clientes matching "${term}"`)),
      catchError(this.handleError<Cliente[]>('searchClientes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Cliente to the server */
  // tslint:disable-next-line:no-shadowed-variable
  addCliente(Cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, Cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => this.log(`added Cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  /** DELETE: delete the Cliente from the server */
  // tslint:disable-next-line: no-shadowed-variable
  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.id;
    const url = `${this.url}/delete/${id}`;

    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Cliente id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  /** PUT: update the Cliente on the server */
  // tslint:disable-next-line: no-shadowed-variable
  updateCliente(cliente: Cliente): Observable<any> {
    return this.http.put(this.url, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`updated Cliente id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ClienteService message with the MessageService */
  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.messageService.add(`ClienteService: ${message}`);
  }
}



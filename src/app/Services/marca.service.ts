import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor( private http: HttpClient) { }

  getMarcas() {
    return this.http.get(`${environment.api}marcas`);
  }
}

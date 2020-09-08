import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class CarroService {

  carro;
  constructor( private http: HttpClient) { }

  getCarro(id) {
   return this.http.get(`${environment.api}carros/${id}`);
  }

  getCarros() {
    return this.http.get(`${environment.api}carros`);
  }

  postCarros(body: any) {
    return this.http.post(`${environment.api}carros/`, body);
  }

  putCarros(body: any) {
    return this.http.put(`${environment.api}carros/${body.id}`, body);
  }

  deleteCarro(id: number) {
    console.log('hue');
    return this.http.delete(`${environment.api}carros/${id}`);
  }

}

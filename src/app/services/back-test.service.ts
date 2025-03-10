import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataFormat, Product } from '../models/back-test.model';

@Injectable({
  providedIn: 'root'
})
export class BackTestService {

  private apiUrl:string = '/api';  // API de ejemplo

  constructor(private http: HttpClient) {}

  // Método para obtener datos
  getProducts(): Observable<DataFormat> {
    return this.http.get<DataFormat>(`${this.apiUrl}/bp/products`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/bp/products`, product);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/bp/products/${id}`);
  }

  editProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/bp/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/bp/products/${id}`);
  }
}

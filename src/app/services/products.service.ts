import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private host: string = environment.host;
  constructor(private http: HttpClient) { }

  //get Datas
  getAllProducts = (): Observable<Product[]> => this.http.get<Product[]>(this.host + '/products')
  getOneProduct = (id: number): Observable<Product> => this.http.get<Product>(this.host + '/products/' + id)
  getSelectedProducts = (): Observable<Product[]> => this.http.get<Product[]>(this.host + '/products?selected=true')
  getAvailableProducts = (): Observable<Product[]> => this.http.get<Product[]>(this.host + '/products?quantity_ne=0')
  searchProducts = (keyWord: string): Observable<Product[]> => this.http.get<Product[]>(this.host + '/products?name_like=' + keyWord);

  //create And update datas
  updateDetailsProduct = (p: Product): Observable<void> => this.http.put<void>(this.host + '/products/' + p.id, p)
  deleteProduct = (p: Product): Observable<Product[]> => this.http.delete<Product[]>(this.host + '/products/' + p.id)
  save = (p: Product): Observable<Product> => this.http.post<Product>(this.host + '/products', p)
  updateProduct = (id: number, p: Product): Observable<Product> => this.http.put<Product>(this.host + '/products/' + id, p)
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProduct(page:number=1,size:number=7):Observable<Array<Product>>{
    return   this.http.get<Array<Product>>( `http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }
  public checkProduct(product:Product):Observable<Product>{
        return    this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
            {checked:!product.checked});
  }


  public deleteProduct(product: Product): Observable<any> {
    console.log("supression"+this.getProduct());
    return this.http.delete(`http://localhost:8089/products/${product.id}`);
  }

  public  saveProduct(product: Product):Observable<Product> {
      return    this.http.post<Product>(`http://localhost:8089/products`, product);
    }

  public searchProducts(keyword:string){
    return   this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }

}

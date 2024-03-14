import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoundElementProperty } from '@angular/compiler';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  /*products:Array<any> = [
    {id:1,name:"computer",price:2333,checked:false},
    {id:2,name:"computer",price:3333,checked:true},
    {id:3,name:"computer",price:4333,checked:false},
    {id:4,name:"computer",price:5333,checked:false},
  ];*/
  //injection de  HttpClientModule
    // private http:HttpClient;
    //products:Array<Product> = [];
    // products$ !:Observable<Array<Product>>;
    public products:Array<Product> = [];
    public keyword:string="";
    constructor(private productService:ProductService) {
    }
    ngOnInit(){
        this.getProducts();
    }

    getProducts() {
        this.productService.getProduct(1,7)
        .subscribe({
           next : data=> {
             this.products = data
       }
    })

     //this.products=this.productService.getProduct();
  }
 // envoie de request http pour chercher les produits au niveau du backend

  //pour faire le cheked des bouton
  handleCheckProduct(product:Product){
    this.productService.checkProduct(product).subscribe({
      next : updatedProduct => {
        product.checked = !product.checked;
      }
   })
    product.checked = product.checked;

  }
  //pour utiliser Json Server Rest API
  /**
   * APPP NOD JS QUI PERMET DE METTRE EN PLACE UNE BACKED POST GET sa marche pour les test frontend  ..
   * il faut  installer npm install -g json-server
   * on demarr json server
   * #####json-server -w data/db.json -p 8089 #####
   *  Loading data/db.json
      Done
      Resources
      http://localhost:8089/products
      Home
      http://localhost:8089
   *
   */
  //methode suppresion
  handleDelete(product:Product) {
      if(confirm("Est vous sure ?"))
      this.productService.deleteProduct(product).subscribe({
       next:value => {
            this.getProducts();
           //this.products=this.products.filter(p=>p.id!=product.id);
       }}
   )
  }

    searchProducts() {
        this.productService.searchProducts(this.keyword).subscribe({
          next:value=> {
            this.products=value;
          }
        })
    }
}

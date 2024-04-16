import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProduct[] = [];

  constructor() { }

  add(product: IProduct){
    this.cart.push(product);
    console.log(product.name + " added to cart")
    console.log(this.cart)
  }
}

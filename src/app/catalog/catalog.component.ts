import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  filter: string = ''; 
  private carSvc: CartService = inject(CartService);
  toggle: boolean = false;
  cartTotalPrice: number = 0;
  
  constructor(private productSvc : ProductService) {

  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  clickEvent() {
    this.toggle = !this.toggle;
  }

  addToCart(product: IProduct){
    this.carSvc.add(product);
    if(product.discount > 0) {
      this.cartTotalPrice += product.price - (product.price * product.discount);
    } else {
      this.cartTotalPrice += product.price;
    }
    console.log(this.cartTotalPrice)
  }

  getImageUrl(product: IProduct){
    return '/assets/images/robot-parts/' + product.imageName
  }

  getFilteredProducts() {
    return this.filter === '' ? this.products : this.products.filter((product: any) => product.category === this.filter);
  }

  getDiscountedClasses(product: IProduct) {
    if(product.discount > 0)
      return ['strikeThrough'];
    else
      return [];
  }
}

import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
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

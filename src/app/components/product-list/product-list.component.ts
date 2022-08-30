import { Component, OnInit, Input  } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  //@Input() productPackages: Array<ProductComponent>;
  @Input() productPackages: Promise<ProductComponent>;

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { InitialState } from './store/reducer';
import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';
import { ProductComponent } from './components/product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private ngRedux: NgRedux<InitialState>, private productsService: ProductsService) { }
  @select('items') items$: Observable<Array<ProductComponent>>;
  title = 'dt-webshop';

  ngOnInit() {
    this.productsService.getAll();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../components/product/product.component';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../store/reducer';
import { LoadItems } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  dataType: string = '/productPackages';
  serverUrl: string = 'http://localhost:3000';

  /** @constructor */
  constructor(private http: HttpClient, private ngRedux: NgRedux<InitialState>) { }

  /**
   * @public
   * Get all products,
   * Protokol: HTTP GET
   */
  getAll() {
    let url = `${this.serverUrl}${this.dataType}`;
    //console.log('url', url)
    this.http.get(url)
      .subscribe((products: Array<ProductComponent>) => {
        //console.log('products', products)
        this.ngRedux.dispatch(LoadItems(products));
      });
  }
}

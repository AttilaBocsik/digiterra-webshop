import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from 'src/app/store/reducer';
import { AddToCart, RemoveFromCart } from 'src/app/store/actions';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from 'src/app/services/languages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(private ngRedux: NgRedux<InitialState>,public translate: TranslateService, private languagesService: LanguagesService) {
    translate.addLangs(['Magyar', 'English']);
   }

  inCart = false;
  @Input() product: Product;

  /**
   * Language
   */
  language: string;
  languageSubscription: Subscription;

  addToCart(item: Product) {
    this.ngRedux.dispatch(AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: Product) {
    this.ngRedux.dispatch(RemoveFromCart(item));
    this.inCart = false;
  }

  ngOnInit() {
    this.languageSubscription = this.languagesService.getLanguage()
      .subscribe(lang => {
        this.language = lang;
        this.translate.use(this.language);
      },
        err => console.error(err),
        () => console.log('unsubscribed')
      );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

}

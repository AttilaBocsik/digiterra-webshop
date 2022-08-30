import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
//import { NgRedux } from '@angular-redux/store';
//import { InitialState } from 'src/app/store/reducer';
//import { ProductComponent } from '../product/product.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesService } from 'src/app/services/languages.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from 'src/app/store/reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();

  language: string;
  languageSubscription: Subscription;
  selectedValue: string = 'Magyar';

  constructor(private ngRedux: NgRedux<InitialState>, private router: Router, public translate: TranslateService, private languagesService: LanguagesService) {
    
    this.ngRedux
      .select<Array<ProductComponent>>('cart')
      .subscribe((items: Array<ProductComponent>) => {
        this.cart = items;
        console.log('cart',this.cart);
      });
    
    translate.addLangs(['Magyar', 'English']);
    translate.setDefaultLang('Magyar');
  }
  cart: Array<ProductComponent>;

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

  switchLang(lang: string) {
    this.languagesService.setLanguage(lang);
    this.translate.use(lang);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


}

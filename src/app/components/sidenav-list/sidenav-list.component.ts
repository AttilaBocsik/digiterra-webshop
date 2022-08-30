import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LanguagesService } from 'src/app/services/languages.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter();

  language: string;
  languageSubscription: Subscription;

  constructor(private router: Router, public translate: TranslateService, private languagesService: LanguagesService) {
    translate.addLangs(['Magyar', 'English']);
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

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}

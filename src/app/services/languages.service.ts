import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  observables: any = {};

  constructor() { }

  public getLanguage(): Observable<any> {
    if (!this.observables['_language']) {
      this.observables['_language'] = new Subject();
    }
    return this.observables['_language'];
  }

  setLanguage(lang: string): void {
    if (!this.observables['_language']) {
      this.observables['_language'] = new Subject();
    }
    this.observables['_language'].next(lang);
  }
}
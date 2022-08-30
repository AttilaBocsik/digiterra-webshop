import { TestBed } from '@angular/core/testing';

import { LanguagesService } from './languages.service';
import { Subscription, Observable } from 'rxjs';

describe('LanguagesService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguagesService = TestBed.get(LanguagesService);
    expect(service).toBeTruthy();
  });

  it('set and get language', () => {
    const testLang: string = 'Magyar';
    const service: LanguagesService = TestBed.get(LanguagesService);
    service.setLanguage(testLang);
    service.getLanguage().subscribe(lang => {
      expect(lang).not.toBeNull();
      expect(lang).toBe(testLang);
    });
  });
});

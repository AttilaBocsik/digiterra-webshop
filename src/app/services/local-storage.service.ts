import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { AsyncResponse } from '../models/async-response';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  /*
  public getStoragedToken(storagename: string): any {
    let storeResult: Object;
    storeResult = JSON.parse(localStorage.getItem(storagename));
    return storeResult;
  }
  */

  public async get(storagename: string): Promise<AsyncResponse> {
    return new Promise<AsyncResponse>(async (resolve: Function) => {
      let storeResult: Object;
      try {
        storeResult = JSON.parse(localStorage.getItem(storagename));
        return resolve({ success: true, data: storeResult, message: '', meta: {} })
      } catch (error) {
        console.error('localStorageService/get error.', error)
        return resolve({ success: false, data: {}, message: 'Local Storage Error', meta: {} })
      }
    })
  }

  public async set(storagename: string, value: Object): Promise<AsyncResponse> {
    return new Promise<AsyncResponse>(async (resolve: Function) => {
      storagename = storagename.toString();
      let storeValue: String;
      try {
        storeValue = JSON.stringify(value);
        localStorage.setItem(storagename, storeValue.toString());
        return resolve({ success: true, data: { }, message: '', meta: {} })
      } catch (error) {
        console.error('localStorageService/set error.', error)
        return resolve({ success: false, data: {}, message: 'Local Storage Error', meta: {} })
      }
    })
  }
}

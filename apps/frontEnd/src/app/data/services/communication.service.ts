import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  tabIndex = 0;

  constructor() { }

  setTabIndex(num: number) {
    this.tabIndex = num;
  }

  getTabIndex() {
    return this.tabIndex;
  }
}

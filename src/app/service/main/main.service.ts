import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  getRandom() {
    // 1 ~ 100 랜덤 수 생성
    return Math.floor(Math.random() * 100 + 1);
  }
}

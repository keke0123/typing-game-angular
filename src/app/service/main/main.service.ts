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

  shuffle(arr) {
    let len = arr.length;
    if(len === 1) return arr;
    let i = len * 2;
    while(i>0) {
      let idx1 = Math.floor(Math.random() * len);
      let idx2 = Math.floor(Math.random() * len);
      if(idx1 == idx2) continue;
      let temp = arr[idx1];
      arr[idx1] = arr[idx2];
      arr[idx2] = temp;
      i--;
    }
    // console.log(arr);
    return arr;
  }
}

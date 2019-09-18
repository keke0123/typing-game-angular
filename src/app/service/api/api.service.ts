import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getWord(num) {
    return this.http.get(`http://localhost:3000/words/${num}`);
  }

  getWords() {
    // return this.http.get(`http://localhost:3000/words`);
    return this.http.get('http://54.180.32.46/words');
  }

  // getTest() {
  //   return this.http.get('http://54.180.32.46/words');
  // }
}

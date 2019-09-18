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
}

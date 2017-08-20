import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: Http) {

  }

  getData() {
  	return this.http.get('http://127.0.0.1:3000/user')
  		.map((res) => res.json())
  };

}

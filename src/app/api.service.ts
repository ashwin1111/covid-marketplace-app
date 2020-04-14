import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getBaseUrl() {
    var local = 'http://localhost:5555';
    var prod = 'https://covid19-pollachi.herokuapp.com';
    return local;
  }

  getApiCall(apiUrl): Promise<void | Object> {
    // console.log('api call in progress');
    const token = localStorage.getItem('x-access-token');
    var httpOptions;
    if (token !== null) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token
        })
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }

    return this.http.get(apiUrl, httpOptions).toPromise().then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  }

  apiCall(apiUrl, payloadData): Promise<void | Object> {
    // console.log('api call in progress');
    const token = localStorage.getItem('x-access-token');
    var httpOptions;
    if (token !== null) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': token
        })
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }

    return this.http.post(apiUrl, payloadData, httpOptions).toPromise().then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  }
}

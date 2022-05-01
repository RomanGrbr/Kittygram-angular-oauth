import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';

const baseUrl = 'http://127.0.0.1:8000/api/v1/cats';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  constructor(private http: HttpClient, private _userService: UserService) { }
  getAll() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer' + this._userService.access_token
      })
    };
    return this.http.get(baseUrl, httpOptions);
  }
  get(id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._userService.access_token
      })
    };
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }
  create(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._userService.access_token
      })
    };
    return this.http.post(baseUrl, data, httpOptions);
  }
  update(id, data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._userService.access_token
      })
    };
    return this.http.put(`${baseUrl}/${id}`, data, httpOptions);
  }
  delete(id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._userService.access_token
      })
    };
    return this.http.delete(`${baseUrl}/${id}`, httpOptions);
  }
  // deleteAll() {
  //   return this.http.delete(baseUrl);
  // }
  findByTitle(name) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._userService.access_token
      })
    };
    return this.http.get(`${baseUrl}?name=${name}`, httpOptions);
  }
}
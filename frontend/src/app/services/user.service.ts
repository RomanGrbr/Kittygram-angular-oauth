import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
 
@Injectable()
export class UserService {
 
  private httpOptions: any;
 
  // текущий токен
  public access_token: string;

  // токен для обновления
  public refresh_token: string;
 
  // время окончания жизни токена
  public token_expires: Date;
 
  // логин пользователя
  public username: string;
 
  // сообщения об ошибках авторизации
  public errors: any = [];
 
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'x-www-form-urlencoded'})
    };
  }
 
  // используем http.post() для получения токена
  public login(user) {
    this.http.post('http://127.0.0.1:8000/authentication/token/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        this.updateData(data['access_token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  // обновление JWT токена
  public refreshToken() {
    this.http.post('http://127.0.0.1:8000/authentication/token/refresh/', JSON.stringify({token: this.refresh_token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['access_token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    this.access_token = null;
    this.token_expires = null;
    this.username = null;
  }
 
  private updateData(token) {
    this.access_token = token;
    this.errors = [];
 
    // декодирование токена для получения логина и времени жизни токена
    const token_parts = this.access_token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
 
}
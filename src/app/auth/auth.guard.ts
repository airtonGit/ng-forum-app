import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private nome: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getNome() {
    return this.nome;
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const token = localStorage.getItem('FORUM_APP_TOKEN');
    const nome = localStorage.getItem('FORUM_APP_USERNOME');
    console.log('AUTH localStore ', token);
    if (token === null || token === '') {
      this.loggedIn.next(false);
    } else {
      this.token = token;
      this.nome = nome;
      this.loggedIn.next(true);
    }
  }

  getToken(): string {
    return this.token;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn;
  }

  doLogin(userName: string, senhaForm: string){
    return new Promise( (resolve, reject) => {
      const url = 'https://us-central1-projeto-n2b.cloudfunctions.net/n2b-autenticar-usuario';
      const body = {
        payload: {
          username: userName,
          senha: senhaForm,
        },
      };
      this.http.post(url, body).subscribe( (data: any) => {
        console.log('Retorno login', data);
        if ( data.error === '') {
          // login ok
          this.nome = data.info.nome;
          this.token = data.info.token;
          localStorage.setItem('FORUM_APP_TOKEN', this.token);
          localStorage.setItem('FORUM_APP_USERNOME', this.nome);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
        resolve(data);
      });
    });
  }

  logout() {
    this.loggedIn.next(false);
    this.token = undefined;
    this.nome = '';
    localStorage.setItem('FORUM_APP_TOKEN', '');
    this.router.navigate(['/']);
  }
}

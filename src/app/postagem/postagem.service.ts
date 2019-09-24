import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

// NAO ESTOU USANDO MAIS ESTE SERVICE

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthGuard
    ) { }

  getPostagens() {
    const url = 'https://us-central1-projeto-n2b.cloudfunctions.net/n2b-listar-postagens';
    return this.http.get(url);
  }

  enviarPost(tituloForm: string, corpoForm: string) {
    return new Promise( (resolve, reject) => {
      const url = 'https://us-central1-projeto-n2b.cloudfunctions.net/n2b-postagem-nova';
      const body = {
        payload: {
          token: this.auth.getToken(),
          titulo: tituloForm,
          corpo: corpoForm,
        },
      };
      this.http.post(url, body).subscribe( (data: any) => {
        console.log('Retorno enviaPost', data);
        if ( data.error === '') {
          // postagem ok
          this.router.navigate(['/']);
        }
        resolve(data);
      });
    });
  }
}

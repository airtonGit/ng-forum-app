import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';
import { PostagemService } from '../postagem/postagem.service';

@Component({
  selector: 'app-postagem-nova',
  templateUrl: './postagem-nova.component.html',
  styleUrls: ['./postagem-nova.component.sass']
})
export class PostagemNovaComponent implements OnInit {
  postagemForm;
  private formSubmitAttempt: boolean;
  private busyLoading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthGuard,
    private postagemSrv: PostagemService
  ) {
    this.busyLoading = false;
    this.postagemForm = this.formBuilder.group({
      titulo: '',
      corpo: ''
    });
   }

  ngOnInit() {
  }

  isFieldInvalid(field: string) {
    return (
      (!this.postagemForm.get(field).valid && this.postagemForm.get(field).touched) ||
      (this.postagemForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async enviarPost(postData){
    this.busyLoading = true;
    await this.postagemSrv.enviarPost(postData.titulo, postData.corpo);
    this.busyLoading = false;
  }

  onSubmit(postData) {
    // Enviar usuario e senha ao backend
    console.warn('Login data submit', postData);
    if (this.postagemForm.valid) {
      console.log('loginform valido, enviar dados');
      // this.doLogin(loginData);
      this.enviarPost(postData);
    }
    this.formSubmitAttempt = true;
  }

}

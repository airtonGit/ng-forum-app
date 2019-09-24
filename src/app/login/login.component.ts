import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm;
  private formSubmitAttempt: boolean;
  private busyLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthGuard
    ) {
    this.busyLoading = false;
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async doLogin(loginData) {
    this.busyLoading = true;
    await this.auth.doLogin(loginData.username, loginData.password);
    this.busyLoading = false;
  }

  onSubmit(loginData) {
    // Enviar usuario e senha ao backend
    console.warn('Login data submit', loginData);
    if (this.loginForm.valid) {
      console.log('loginform valido, enviar dados');
      this.doLogin(loginData);
    }
    this.formSubmitAttempt = true;
  }

}

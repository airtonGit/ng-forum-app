import { Component, OnInit, NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { auth } from 'firebase';

@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.sass']
})

export class MenuTopComponent implements OnInit {

  logadoStatus: boolean;
  nome: string;

  constructor(private userAuth: AuthGuard) {
    this.userAuth.isLoggedIn.subscribe( status => {
      console.log('MENU_TOP logged', status);
      this.logadoStatus = status;
      this.nome = this.userAuth.getNome();
    });
  }

  ngOnInit() {
  }

  logoff() {
    console.log('Solicitou logoff');
    // this.logadoStatus = false;
    this.nome = '';
    this.userAuth.logout();
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostagemNovaComponent } from './postagem-nova/postagem-nova.component';
import { ListaComponent } from './postagem/lista/lista.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'lista', component: ListaComponent },
  { path: '',
    redirectTo: '/lista',
    pathMatch: 'full'
  },
  { path: 'postagens/nova', component: PostagemNovaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '*', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        routes,
        { enableTracing: false } // <-- debugging purposes only
      )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

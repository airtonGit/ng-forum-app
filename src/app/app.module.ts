import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ListaComponent } from './postagem/lista/lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostagemNovaComponent } from './postagem-nova/postagem-nova.component';
import { ForumMaterialModule } from './material-module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { LoginComponent } from './login/login.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    PostagemNovaComponent,
    PaginaNaoEncontradaComponent,
    MenuTopComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Importar depois de BrowserModule
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ForumMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

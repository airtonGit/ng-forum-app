import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../postagem.service';
import PostagemFunctionResponse from '../PostagemFunctionResponse';
import PostagemFirestoreItem from '../PostagemFirestoreItem';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Postagem } from '../postagem';
import { firestore } from 'firebase';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.sass']
})
export class ListaComponent implements OnInit {

  postagens: Postagem[];

  constructor( /* postagemSrv: PostagemService ,*/ db: AngularFirestore) {
    this.postagens = [];

    db.collection<PostagemFirestoreItem>('postagem').valueChanges()
      .subscribe( value => {
        value.forEach( (item: firestore.DocumentData) => {
          this.postagens.push({
            id: item.id,
            titulo: item.titulo,
            corpo: item.corpo,
            autorNome: 'nome',
            criado: item.criado.toMillis()
          });
        });
      });
  }

  ngOnInit() {
  }

}

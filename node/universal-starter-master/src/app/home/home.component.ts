import { Component, OnInit } from '@angular/core';

/* Services */
import { PostsService } from '../core/posts.service';

/* Models */
import { Post } from "../shared/models/posts";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /*posts = [
    {
      image: '/assets/images/wall.jpg',
      title: 'Destruye las 4 barreras de angular',
      description: 'Una guía paso a paso para empezar con angular y aguantar más de cinco minutos.'
    }, {
      image: '/assets/images/DomadorCaballos.jpg',
      title: 'NPM: Domínalo completamente de una vez',
      description: '¿Te da repelús actualizar un paquete? ¿Sudas cada vez que tienes que editar el package.json? Este es tu post.'
    }, {
      image: '/assets/images/armaSecreta.jpg',
      title: 'Los observables son el arma secreta de Angular',
      description: 'La evolución natural de las promesas tiene miles de posibilidades para gestionar asincronía.'
    }, {
      image: '/assets/images/superYo.jpg',
      title: 'La mejor versión de EcmaScript se llama TypeScript',
      description: 'Te traemos una guía rapidísima para que empieces a producir código potente, seguro y legible.'
    }
  ];*/

  posts: Post[];

  constructor(
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => this.posts = posts,
      (error) => {
        throw (new Error(error.message));
      }
    );
  }
}
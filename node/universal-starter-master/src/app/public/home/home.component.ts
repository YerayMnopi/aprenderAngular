import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { PostsService } from '../../core/posts.service';
import { AnalyticsService } from '../analytics.service';

/* Models */
import { Post } from "../../shared/models/posts";
import { Highlight } from "../../shared/models/highlight.interface";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  highlights: Highlight[];

  constructor(
    private analyticsService: AnalyticsService,
    private postService: PostsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getPost();
    this.analyticsService.sendPageView('');

    this.highlights = [
      {
        iconName: 'dollar',
        heading: 'Alta demanda',
        text: 'Los expertos en las últimas versiones de angular son sumamente valorados en el mercado actual.'
      },
      {
        iconName: 'rocket',
        heading: 'Proyección',
        text: 'Angular no es un framework más; es una plataforma completa para los desarrolladores que llegó para quedarse.'
      },
      {
        iconName: 'chronometer',
        heading: 'Muy muy rápido',
        text: 'Ofrece a tu empresa y a tus clientes aplicaciones con una eficiencia demoledora.'
      },
      {
        iconName: 'heart',
        heading: 'Diseños que enamoran',
        text: 'Angular pone a tu disposición las herramientas necesarias para conseguir las interfaces que siempre soñaste.'
      },
      {
        iconName: 'checkmark',
        heading: 'Pasa todos los test',
        text: 'Si construyes tu web con angular obtendrás calidad en todos los dispositivos y navegadores.'
      },
      {
        iconName: 'pig',
        heading: 'Completamente gratis',
        text: 'Trabajar con angular no cuesta absolutamente nada.'
      },
    ];
  }

  getPost() {
    this.postService.getPublishedPosts().subscribe(
      (posts: Post[]) => this.posts = posts,
      (error) => {
        throw (new Error(error.message));
      }
    );
  }

  goToFirstPost() {
    this.router.navigate(['articulos', 'destruye-las-4-barreras-de-angular']);
  }
}
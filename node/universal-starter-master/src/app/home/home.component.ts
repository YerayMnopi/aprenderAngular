import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  posts = [
      {
        image: 'wall.jpg',
        title: 'Destruye las 4 barreras de angular',
        description: 'Una guía paso a paso para empezar con angular y aguantar más de cinco minutos.'
      }, {
        image: 'DomadorCaballos.jpg',
        title: 'NPM: Domínalo completamente de una vez',
        description: '¿Te da repelús actualizar un paquete? ¿Sudas cada vez que tienes que editar el package.json? Este es tu post.'
      }, {
        image: 'armaSecreta.jpg',
        title: 'Los observables son el arma secreta de Angular',
        description: 'La evolución natural de las promesas tiene miles de posibilidades para gestionar asincronía.'
      }, {
        image: 'superYo.jpg',
        title: 'La mejor versión de EcmaScript se llama TypeScript',
        description: 'Te traemos una guía rapidísima para que empieces a producir código potente, seguro y legible.'
      }, {
        image: 'perro.jpeg',
        title: 'PELIGRO: el poder de Sass se volverá en tu contra',
        description: 'Érase una vez una promesa de mejorar css. Descubre por qué no funcionó.'
      }, {
        image: 'Falso-Experto-1.jpg',
        title: 'No leas esto si ya sabes TODO sobre los servicios en angular',
        description: 'Si piensas que los servicios solo sirven para hacer peticiones http, estás tardando en leer esto.'
      }
  ];

  constructor() {}



}
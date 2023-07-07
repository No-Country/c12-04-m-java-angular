import { Component, OnInit } from '@angular/core';

interface Proyecto {
  name: string;
  description: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  proyectos: Proyecto[] = [];

  ngOnInit() {
    this.obtenerProyectos();
  }

  obtenerProyectos() { //Simulo el listado de proyecto que me devuelve
    this.proyectos = [
      { name: 'Proyecto 1', description: 'Descripcion del proyecto 1'},
      { name: 'Proyecto 2', description: 'Descripcion del proyecto 2' },
      { name: 'Proyecto 3', description: 'Descripcion del proyecto 3' }
    ];
  }
}

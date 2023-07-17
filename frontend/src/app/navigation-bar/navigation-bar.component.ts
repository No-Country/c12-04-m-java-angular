import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  proyectos: any[] = [];
  showList: boolean = false;

  /*ejemploPeticionProyectos: any[] = [
    { nombre: 'Proyecto 1', espacios: ['Espacio 1', 'Espacio 2', 'Espacio 3'] },
    { nombre: 'Proyecto 2', espacios: ['Espacio 4', 'Espacio 5', 'Espacio 6'] },
    { nombre: 'Proyecto 3', espacios: ['Espacio 7', 'Espacio 8', 'Espacio 9'] }
  ];*/

  constructor(private http: HttpClient) { }
  loadProjects() {
    this.getProjects().subscribe(
      data => {
        this.proyectos = data;
      }
    )
  }
  getProjects(): Observable<any[]> {
    const url = 'http://ninja-app-v1-api.azure-api.net/workspace'
    return this.http.get<any[]>(url);
  }

  toggleListProjects() {
    this.loadProjects();
    this.showList = !this.showList;
  }
}

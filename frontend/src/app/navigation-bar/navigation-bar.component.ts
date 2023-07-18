import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  proyectos: any[] = [];
  showList: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }
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
  redirigir(id: number) { //funcion para que cada proyecto rediriga a su propia pagina
    this.router.navigateByUrl(`/projects/${id}`);
  }
}

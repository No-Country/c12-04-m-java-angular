import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  proyectos: any[] = [];
  showNavbar: boolean = false;
  showList: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !((event.url === '/')||(event.url === '/logInAndRegister'));
      }
    })
  };
  loadProjects() {
    this.getProjects().subscribe(
      data => {
        this.proyectos = data;
      }
    )
  }
  getProjects(): Observable<any[]> {
    const url = 'https://ninja-app-v1-api.azure-api.net/workspace'
    return this.http.get<any[]>(url);
  }

  toggleListProjects() {
    this.loadProjects();
    this.showList = !this.showList;
  }
  redirigir(id: number,proyectoName: string) { //funcion para que cada proyecto rediriga a su propia pagina
    this.router.navigateByUrl(`/projects/${proyectoName}/${id}`).then(() => {
      // Después de la redirección, recargamos la página
      window.location.reload();
    });

  }
  redirigirHome(){
    this.router.navigateByUrl(`home`);
  }
  redirigirProfile(){
    this.router.navigateByUrl(`profile`);
  }
}
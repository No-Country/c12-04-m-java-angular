import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Espacio {
  nameSpace: string;
  description: string;
  workspace: {
    id: number;
  }
}

interface Proyecto {
  nameWorkspace: string;
  description: string;
  id: number;
  spaceSet: Espacio[]
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  proyectos: Proyecto[] = [];
  modalVisible: boolean = false;
  espacios: Espacio[] = [];
  spaceEditing: Espacio = {
    nameSpace: '',
    description: '',
    workspace: {
      id: 0
    }
  }
  projectEditing: Proyecto = {
    nameWorkspace: '',
    description: '',
    id: 0,
    spaceSet: [this.spaceEditing]
  };

  ngOnInit() {
    this.loadProjects();
  }
  loadProjects() {
    this.obtenerProyectos().subscribe(
      data => {
        this.proyectos = data;
      }
    )
  }
  urlAPI: string =  'http://ninja-app-v1-api.azure-api.net/';
  
  obtenerProyectos(): Observable<any[]> {
    const url = this.urlAPI + 'workspace';

    return this.http.get<any[]>(url);
  }

  agregarProyecto(nuevoProyecto: Proyecto): Observable<any> { //POST
    const url = this.urlAPI + 'workspace';

    return this.http.post(url, nuevoProyecto);
  }
  agregarEspacio(nuevoEspacio: Espacio): Observable<any> {
    const url = this.urlAPI + 'space';
    return this.http.post(url, nuevoEspacio);
  }

  eliminarProyecto(id: number): Observable<any> { //DELETE
    const url = this.urlAPI + `workspace?id=${id}`;

    return this.http.delete(url);
  }
  editarProyecto(proyecto: Proyecto): Observable<any> { //PUT
    const url = this.urlAPI + `workspace?id=${proyecto.id}`;

    return this.http.put(url, proyecto);
  }

  openModal(proyecto: Proyecto) {
    this.projectEditing = proyecto;
    this.modalVisible = true;
  }
  closeModal() {
    this.modalVisible = false;
    this.modalNewProjectVisible = false;
  }
  editandoTexto: boolean = false;
  activarEdicion() {
    this.editandoTexto = true;
  }
  guardarTexto() {
    this.editandoTexto = false;
  }
  //Funciones para el Modal de crear un nuevo proyecto
  modalNewProjectVisible: boolean = false;
  textoTituloEditable: string = "Nuevo Proyecto";
  textoDescripcionEditable: string = "Descripcion de este proyecto";

  openModalCreateProject() {
    if (this.proyectos.length < 10) {
      this.modalNewProjectVisible = true;
    }
  }

  crearProyecto() {
    const nuevoProyecto: any = {
      nameWorkspace: this.textoTituloEditable,
      description: this.textoDescripcionEditable,
    };
    this.editandoTexto = false;

    this.textoTituloEditable = "Nuevo Proyecto" //Reset de los valores para cuando se cree otro proyecto
    this.textoDescripcionEditable = "Descripcion de este proyecto";

    this.closeModal();
    this.agregarProyecto(nuevoProyecto).subscribe(
      (data) => {
        this.loadProjects();
        this.loadSpacesNewProject();
        this.loadProjects();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
  loadSpacesNewProject() {
    const espacioFrontEnd: Espacio = {
      nameSpace: 'Front-End',
      description: 'Espacio dedicado para Front-End',
      workspace: {
        id: this.proyectos[this.proyectos.length - 1].id
      }
    }
    const espacioBackEnd: Espacio = {
      nameSpace: 'Back-End',
      description: 'Espacio dedicado para Back-End',
      workspace: {
        id: this.proyectos[this.proyectos.length - 1].id
      }
    }
    const espacioTesting: Espacio = {
      nameSpace: 'Testing',
      description: 'Espacio dedicado para Testing',
      workspace: {
        id: this.proyectos[this.proyectos.length - 1].id
      }
    }
    const espacioUXUI: Espacio = {
      nameSpace: 'UX/UI',
      description: 'Espacio dedicado para UX/UI',
      workspace: {
        id: this.proyectos[this.proyectos.length - 1].id
      }
    }
    //Funciones para cargar los 4 espacios predeterminados a la BBDD
    this.agregarEspacio(espacioFrontEnd)
    this.agregarEspacio(espacioBackEnd)
    this.agregarEspacio(espacioTesting)
    this.agregarEspacio(espacioUXUI)
  }
  //Funciones para editar proyecto ya creado.
  borrarProyecto(id: number) {
    this.eliminarProyecto(id).subscribe(
      () => {
        this.loadProjects();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
    this.closeModal();
  }
  guardarProyecto() {
    this.editarProyecto(this.projectEditing).subscribe(
      (data) => {
        this.loadProjects();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
    this.closeModal();
  }

  redirigir(id: number) { //funcion para que cada proyecto rediriga a su propia pagina
    this.router.navigateByUrl(`/projects/${id}`);
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, concatMap, from } from 'rxjs';
import { Router } from '@angular/router';

interface Espacio {
  nameSpace: string;
  description: string;
}

interface Proyecto {
  nameWorkspace: string;
  description: string;
  id: number;
  //userSet: [];
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
  espacios: Espacio[] = [];
  spaceEditing: Espacio = {
    nameSpace: "",
    description: ""
  }
  projectEditing: Proyecto = {
    nameWorkspace: '',
    description: '',
    //userSet: [],
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
  urlAPI: string = 'https://ninja-app-v1-api.azure-api.net/';

  obtenerProyectos(): Observable<any[]> {
    const url = this.urlAPI + 'workspace';

    return this.http.get<any[]>(url);
  }

  agregarProyecto(nuevoProyecto: Proyecto): Observable<any> { //POST
    const url = this.urlAPI + 'workspace';

    return this.http.post(url, nuevoProyecto);
  }

  agregarEspacio(nuevoEspacio: Espacio, id: number): Observable<any> {
    const url = this.urlAPI + `space?workspaceId=${id}`;

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
  modalVisible: boolean = false;
  openModal(proyecto: Proyecto) {
    console.log(this.projectEditing)
    this.projectEditing = proyecto;
    console.log(this.projectEditing)
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

    this.textoTituloEditable = "Nuevo Proyecto";
    this.textoDescripcionEditable = "Descripción de este proyecto";

    this.closeModal();

    this.agregarProyecto(nuevoProyecto).pipe(
      concatMap((data: any) => {
        return this.loadSpacesNewProject(data.id);
      })
    ).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
  loadNewSpace(id: number) {
    const nuevoEspacio: Espacio = {
      nameSpace: "Nuevo Espacio",
      description: "Descripcion de nuevo espacio"
    }
    this.agregarEspacio(nuevoEspacio, id).subscribe(
      () => {
        this.loadProjects();
      },
      (error) => {
        console.error('Error al crear el objeto', error);
      }
    );

  }
  loadSpacesNewProject(projectId: number): any {
    const espacioFrontEnd: Espacio = {
      nameSpace: "Front-End",
      description: "Espacio dedicado para Front-End"
    };
    const espacioBackEnd: Espacio = {
      nameSpace: "Back-End",
      description: "Espacio dedicado para Back-End",
    };
    const espacioTesting: Espacio = {
      nameSpace: "Testing",
      description: "Espacio dedicado para Testing",
    };
    const espacioUXUI: Espacio = {
      nameSpace: "UX/UI",
      description: "Espacio dedicado para UX/UI",
    };

    return this.agregarEspacio(espacioFrontEnd, projectId).pipe(
      concatMap(() => this.agregarEspacio(espacioBackEnd, projectId)),
      concatMap(() => this.agregarEspacio(espacioTesting, projectId)),
      concatMap(() => this.agregarEspacio(espacioUXUI, projectId))
    );
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
  /*
    listUsers: boolean = false;
    toggleListUsersInProject(id:number){ //Mostar lista de usuarios
      this.listUsers = !this.listUsers;
    }
  
    modalNewUser:boolean =false;
    openModalAddUser(){ //Mostrar modal para agregar usuario a proyecto
      this.listUsers = !this.listUsers;
    }
  */
  redirigir(id: number,proyectoName: string) { //funcion para que cada proyecto rediriga a su propia pagina
    this.router.navigateByUrl(`/projects/${proyectoName}/${id}`);

  }

}
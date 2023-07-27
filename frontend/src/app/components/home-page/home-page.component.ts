import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, concatMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

interface Espacio {
  nameSpace: string;
  description: string;
}
interface Usuario {
  name: string;
  id: number
}
interface Proyecto {
  nameWorkspace: string;
  description: string;
  id: number;
  userSet: Usuario[];
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
    description: "",
  }

  projectEditing: Proyecto = {
    nameWorkspace: '',
    description: '',
    userSet: [],
    id: 0,
    spaceSet: [this.spaceEditing]
  };
  totalProjects: number = this.proyectos.length;
  ngOnInit() {
    this.loadProjects();
  }
  loadProjects() {
    this.obtenerProyectos().subscribe(
      (data) => {
        this.proyectos = data;
        this.totalProjects = this.proyectos.length; //Si hay mas de 10 proyectos, no muestra la tarjeta de agregar proyecto
      },
      (error) => {
        console.error('Error: ', error);
      }
    )
  }
  urlAPI: string = 'https://ninja-app-v1-api.azure-api.net/';

  obtenerProyectos(): Observable<any[]> {
    const url = this.urlAPI + 'workspace';

    return this.http.get<any[]>(url);
  }

  agregarProyecto(nuevoProyecto: any): Observable<any[]> { //POST
    const url = this.urlAPI + 'workspace';

    return this.http.post<any[]>(url, nuevoProyecto);
  }

  agregarEspacio(nuevoEspacio: any, id: number): Observable<any> {
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
      description: this.textoDescripcionEditable
    };
    this.editandoTexto = false;

    this.textoTituloEditable = "Nuevo Proyecto";
    this.textoDescripcionEditable = "Descripción de este proyecto";

    this.closeModal();
    this.agregarProyecto(nuevoProyecto).pipe(
      tap((data: any) => {
        this.loadSpacesNewProject(data.id).subscribe(() => {
          this.loadProjects();
        });
      })
    ).subscribe(
      () => {
        this.loadProjects();
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
      description: "Espacio dedicado para Front-End",
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

    this.agregarEspacio(espacioFrontEnd, projectId);
    this.agregarEspacio(espacioBackEnd, projectId);
    this.agregarEspacio(espacioTesting, projectId);
    this.agregarEspacio(espacioUXUI, projectId)
  }
  //Funciones para editar proyecto ya creado.
  modalConfirmDelete: boolean = false;
  toggleModalDelete() {
    this.modalConfirmDelete = !this.modalConfirmDelete
  }
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
    this.toggleModalDelete();
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
  listUsers: boolean = false;
  toggleListUsersInProject() { //Mostar lista de usuarios
    this.listUsers = !this.listUsers;
  }
  modalNewUser: boolean = false;
  idUserToAdd: number = 0;
  showSuccessMessage: boolean = false;

  checkIfUserExists(idUser: number, idProject: number): void {
    this.addUserToProject(idUser, idProject).pipe(
      catchError((error) => {
        console.error('Error en la petición:', error);
        return of({ status: 200, body: error.message || 'Error desconocido' });
      })
    ).subscribe(
      (response) => {
        if (response.status === 200) {
          console.log('La solicitud se completó con éxito');
          console.log(response.body);
          this.idUserToAdd = 0;
          this.showSuccessMessage = true;
          this.loadProjects();
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        } else {
          console.log(response.status);
          console.log('La solicitud falló con un código de estado: ' + response['status']);
        }
      }
    );
  }
  addUserToProject(idUser: number, idProject: number): Observable<any> {
    const url = this.urlAPI + `workspace/users?workspaceId=${idProject}&userId=${idUser}`;
    return this.http.post(url, {})
  }
  redirigir(id: number, proyectoName: string) { //funcion para que cada proyecto rediriga a su propia pagina
    this.router.navigateByUrl(`/projects/${proyectoName}/${id}`);
  }
}
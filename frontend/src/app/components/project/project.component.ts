import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEditSpaceComponent } from '../modal-edit-space/modal-edit-space.component';

interface Space {
  name: string;
  description: string;
  project: number;
}
/*
interface Workspace {
  id: number;
  nameWorkspace: string;
  description: string;
}

interface WorkspaceId {
  id: number;
}

interface DTOSpace {
  id: number;
  nameSpace: string;
  description: string;
  workspace: Workspace;
  tasks: Task[];
}

interface DTOSpaceSinTasks {
  id: number;
  nameSpace: string;
  description: string;
  workspace: Workspace;
}

interface Task {
  id: number;
  nameTask: string;
  description: string;
  dueDate: Date;
  priority: number;
  space: DTOSpace;
}
*/

interface DTOAddSpace {
  nameSpace: string;
  description: string;
}

interface DTOPutSpace {
  nameSpace: string;
  description: string;
}

let dtoSpaces: DTOAddSpace;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  idUrl: number = 0;
  dtoSpaces: any;
  spaceSelected: any = null;
  url: string = "http://ninja-app-v1-api.azure-api.net/";
  projectName: string ="";
 
  spaceListHardcode: Space[]=[
    {
      name: "Diseño",
      description: "descripcion del espacio de Diseño...",
      project: 1,
    },
    {
      name: "Frontend",
      description: "descripcion del espacio de Frontend...",
      project: 2,
    },
    {
      name: "Backend",
      description: "descripcion del espacio de Backend...",
      project: 3,
    },
    {
      name: "QA",
      description: "descripcion del espacio de QA...",
      project: 4,
    },
  ];

  spaceList: Space[]=[];
/*
  tasksListDiseño: Task[]=[
    {
      name: "hacer los diseños",
      description: "descripcion de hacer los diseños",
      expDate: new Date("2000,08,02"),
      priority: 1,
      space: 1,
    },
    {
      name: "hacer los diseños 2",
      description: "descripcion de hacer los diseños 2",
      expDate: new Date("2001,08,02"),
      priority: 2,
      space: 1,
    },
    {
      name: "hacer los diseños",
      description: "descripcion de hacer los diseños",
      expDate: new Date("2002,08,02"),
      priority: 3,
      space: 1,
    },
  ]

  tasksListFrontend: Task[]=[
    {
      name: "hacer layout",
      description: "descripcion hacer layout",
      expDate: new Date("2000,08,02"),
      priority: 1,
      space: 2,
    },
    {
      name: "hacer layout 2",
      description: "descripcion de hacer layout 2",
      expDate: new Date("2001,08,02"),
      priority: 2,
      space: 2,
    },
    {
      name: "hacer logica",
      description: "descripcion de hacer logica",
      expDate: new Date("2002,08,02"),
      priority: 3,
      space: 2,
    },
  ]
*/
  constructor(private http:HttpClient,
    private activatedRouter : ActivatedRoute,){ }

  ngOnInit(){
    this.idUrl = this.activatedRouter.snapshot.params['id'];
    this.projectName = this.activatedRouter.snapshot.params['proyectoName'];
    this.loadSpaces();
    this.spaceList=this.spaceListHardcode; 
  }

  setSelectedItem(item: any) {
    this.spaceSelected = item;
  }

  loadSpaces(){
    
    this.getSpace().subscribe(
      data =>{
        this.dtoSpaces = data;
      }
    )
    console.log(this.dtoSpaces);
  
  }

  createSpace(){
    
    /*let workspaceId: WorkspaceId;
    let dTOAddSpace: DTOAddSpace;
    dTOAddSpace={
      nameSpace: "dasd",
      description: "",
      workspace: {
        id: this.idUrl
      },*/
      
      const dTOAddSpace: DTOAddSpace={
        nameSpace: "pruebaCA",
        description: "nueva descripcionasdasCA",
      }
      console.log("llega");
     this.addSpace(dTOAddSpace).subscribe(
      () => {
        console.log('Objeto creado correctamente');
        // Aquí puedes realizar alguna acción adicional después de eliminar el objeto
      },
      (error) => {
        console.error('Error al crear el objeto', error);
      }
    );

  }



  getSpace(): Observable<any[]>{
    return this.http.get<any[]>(this.url+`space/workspace?workspaceId=`+this.idUrl);
  }

  addSpace(dTOAddSpace:any): Observable<any>{
    console.log("llega2");
    return this.http.post<any>(this.url+`space/workspace?workspaceId=`+this.idUrl, dTOAddSpace)
  }



  updateSpace(id: number, dTOPutSpace:any): Observable<any>{
    return this.http.put<any>(this.url+`space/${id}`, dTOPutSpace)
  }

  getTasks(idGetSpace: number): Observable<any[]>{
    return this.http.get<any[]>(this.url+`/task/space/${idGetSpace}`);
  }

}

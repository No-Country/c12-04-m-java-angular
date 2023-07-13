import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface Space {
  name: string;
  project: number;
}

interface Workspace {
  id: number;
  nameWorkspace: string;
  description: string;
}

interface DTOSpace {
  id: number;
  nameSpace: string;
  description: string;
  workspace: Workspace;
  tasks: Task[];
}

interface DTOAddSpace {
  nameSpace: string;
  description: string;
  workspace: Workspace;
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

let dtoSpaces: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  idUrl: number = 0;
  dtoSpaces: any;
/*  
  spaceListHardcode: Space[]=[
    {
      name: "Diseño",
      project: 1,
    },
    {
      name: "Frontend",
      project: 2,
    },
    {
      name: "Backend",
      project: 3,
    },
    {
      name: "QA",
      project: 4,
    },
  ];

  spaceList: Space[]=[];

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
    this.loadSpaces();
    
  }

  loadSpaces(){
    
    this.getSpace().subscribe(
      data =>{
        this.dtoSpaces = data;
      }
    )
    console.log(this.dtoSpaces);
    
   //simulamos la obtencion de datos de el back
   //this.spaceList=this.spaceListHardcode;
  }

  createSpace(){
    let workspace: Workspace;
    let dTOAddSpace: DTOAddSpace;
    dTOAddSpace={nameSpace: "",
    description: "",
    workspace: {  id: this.idUrl,
      nameWorkspace: "string",
      description: "string",
    },
  };
    
    console.log(this.dtoSpaces);
    
   //simulamos la obtencion de datos de el back
   //this.spaceList=this.spaceListHardcode;
  }


  getSpace(): Observable<any[]>{
    return this.http.get<any[]>("http://190.191.163.21:8080/space/workspace/1");
  }

  //CRUD Space
  
/*
  addSpace(space:Space): Observable<Space>{
    return this.http.post<Space>(this.url+`space/new`, space)
  }

  getSpace(): Observable<Space[]>{
    return this.http.get<Space[]>(this.url+`space/lista`);
  }

  getSpacePorId(id: number): Observable<Space>{
    return this.http.get<Space>(this.url+`space/get/${id}`);
  }

  updateSpace(id: number, space:Space): Observable<Space>{
    return this.http.put<Space>(this.url+`space/update/${id}`, space)
  }
 
  deleteSpace(id: number): Observable<Space>{
   return this.http.delete<Space>(this.url+`space/delete/${id}`);
  }

*/
  
}

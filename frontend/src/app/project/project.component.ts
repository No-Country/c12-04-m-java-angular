import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Space {
  name: string;
  project: number;
}

interface Task {
  name: string;
  description: string;
  expDate: Date;
  priority: number;
  space: number;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  url: string= "";
  
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

  
  /*
  data: Space[]=[
    {
      idSpace: 0,
      name: "",
      tasks: [
        {
          name: "",
          description: "",
          expDate: new Date("0000,00,00"),
          priority: true,
          idSpace: 0,
        }
      ],

    }
  ];
  */

  constructor(/*private http:HttpClient*/){ }

  ngOnInit(){
    
    this.loadSpaces();
    
  }

  loadSpaces(){
    /*
    this.getSpace().subscribe()
        data =>{
        this.spaceList = data;
      }
    */
   //simulamos la obtencion de datos de el back
   this.spaceList=this.spaceListHardcode;
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
  }*/
  
}

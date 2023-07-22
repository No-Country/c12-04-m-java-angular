import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalEditSpaceComponent } from '../modal-edit-space/modal-edit-space.component';

interface Espacio {
  nameSpace: string;
  description: string;
}


interface DTOAddSpace {
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
  spaceList: any;
  spaceSelected: any = null;
  url: string = "https://ninja-app-v1-api.azure-api.net/";
  projectName: string ="";
  spaceDefault: Espacio = {
    nameSpace: "nuevo Espacio",
    description: "nueva Description"
  }
 
  constructor(private http:HttpClient,
    private activatedRouter : ActivatedRoute,){ }

  ngOnInit(){
    this.idUrl = this.activatedRouter.snapshot.params['id'];
    this.projectName = this.activatedRouter.snapshot.params['proyectoName'];
    this.loadSpaces();
  }

  setSelectedSpace(item: any) {
    this.spaceSelected = item;
  }

  loadSpaces(){
    this.getSpace().subscribe(
      data =>{
        this.spaceList = data;
      })}

  createSpace(){
     this.addSpace(this.spaceDefault).subscribe(() => {
        console.log('Objeto creado correctamente');
        window.location.reload();
      },
      (error) => {
        console.error('Error al crear el objeto', error);
      })}

  addSpace(dTOAddSpace:any): Observable<any>{
    return this.http.post<any>(this.url+`space?workspaceId=`+this.idUrl, dTOAddSpace)
  }

  getSpace(): Observable<any[]>{
    return this.http.get<any[]>(this.url+`space/workspace?workspaceId=`+this.idUrl);
  }
}

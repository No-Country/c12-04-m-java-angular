import { Component, HostListener, Input, OnInit } from '@angular/core';
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

export class ProjectComponent{

  idUrl: number = 0;
  spaceList: any;
  spaceSelected: any = {
    nameSpace: "espacio",
    description: "descripcion del espacio"
  }
  newSpace: any = {
    nameSpace: "espacio",
    description: "descripcion del espacio"
  };
  url: string = "https://ninja-app-v1-api.azure-api.net/";
  projectName: string ="";

  numberOfSpaces: boolean=false;
 
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

  changeNumberOfSpaces(spaceList:any){
    if(spaceList.length<6){
      this.numberOfSpaces=true;
    }
  }

  loadSpaces(){
    this.getSpace().subscribe(
      data =>{
        this.spaceList = data;
        this.spaceSelected = data[0];
        this.changeNumberOfSpaces(this.spaceList);
      })}

  getSpace(): Observable<any[]>{
    return this.http.get<any[]>(this.url+`space/workspace?workspaceId=`+this.idUrl);
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

interface DTOPutSpace {
  nameSpace: string;
  description: string;
}

@Component({
  selector: 'app-modal-new-space',
  templateUrl: './modal-new-space.component.html',
  styleUrls: ['./modal-new-space.component.scss']
})

export class ModalNewSpaceComponent {
  @Input() data: any;// con   @Input() data: any; parece que se vinculaba al espacio recibido con el get
  spaceSelected: any;
  urlM: string = "https://ninja-app-v1-api.azure-api.net/";
  numberOfSpace: any;
  spaceEdited: DTOPutSpace = {
    nameSpace: "",
    description: ""
  }
  spaceDefault: DTOPutSpace = {
    nameSpace: "",
    description: ""
  }
  newSpace: DTOPutSpace = {
    nameSpace: `espacio`,
    description: "descripcion del espacio"
  }
  idUrl: number=0;

  constructor(private http:HttpClient,
    private activatedRouter : ActivatedRoute,){ }

  ngOnInit(){
    this.idUrl = this.activatedRouter.snapshot.params['id'];
    this.spaceEdited.nameSpace=this.data.nameSpace;
    this.spaceEdited.description=this.data.description;
    this.CheckNumberOfSpace()
  }

  ngOnDestroy(){
    window.location.reload();
  }

  setSelectedSpace(space: any) {
    this.spaceSelected = space;
  }

  updateSpace(id: number, dTOPutSpace:any){

    this.updateSpaceDos(id,this.spaceEdited).subscribe(() => {
      console.log('Objeto editado correctamente');
      window.location.reload();
    },
    (error) => {
      console.error('Error al editar el objeto', error);
    })
  }

  updateSpaceDos(id: number, dTOPutSpace:DTOPutSpace): Observable<any>{
    return this.http.put(this.urlM+`space?id=${id}`, this.spaceEdited)
  }

  createSpace(){
    this.addSpace(this.newSpace).subscribe((data) => {
       console.log('Objeto creado correctamente');
       window.location.reload();
     },
     (error) => {
       console.error('Error al crear el objeto', error);
     })}

 addSpace(dTOAddSpace:any): Observable<any>{
   return this.http.post<any>(this.urlM+`space?workspaceId=`+this.idUrl, dTOAddSpace)
 }

 CheckNumberOfSpace(){
  return this.http.get<any[]>(this.urlM+`space/workspace?workspaceId=`+this.idUrl).subscribe(
    data =>{
      this.numberOfSpace = data.length+1;
      this.newSpace = {
        nameSpace: `espacio ${this.numberOfSpace}`,
        description: "descripcion del espacio"
      }
    })
  }
}

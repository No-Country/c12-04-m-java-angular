import { HttpClient } from '@angular/common/http';
import { Component,Input } from '@angular/core';
import { Observable } from 'rxjs';

interface DTOPutSpace {
  nameSpace: string;
  description: string;
}

@Component({
  selector: 'app-modal-edit-space',
  templateUrl: './modal-edit-space.component.html',
  styleUrls: ['./modal-edit-space.component.scss']
})



export class ModalEditSpaceComponent {
  @Input() data: any;// con   @Input() data: any; parece que se vinculaba al espacio recibido con el get
  spaceSelected: any;
  urlM: string = "https://ninja-app-v1-api.azure-api.net/";
  spaceEdited: DTOPutSpace = {
    nameSpace: "",
    description: ""
  }
  constructor(private http:HttpClient){ }

  ngOnChanges(){
    this.spaceEdited.nameSpace=this.data.nameSpace;
    this.spaceEdited.description=this.data.description;
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

  
}

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
  @Input() data: any;
  spaceSelected: any;
  urlM: string = "https://ninja-app-v1-api.azure-api.net/";
  spaceEdited: DTOPutSpace = {
    nameSpace: "",
    description: ""
  }
  constructor(private http:HttpClient){ }

  setSelectedSpace(space: any) {
    this.spaceSelected = space;
  }

  updateSpace(id: number, dTOPutSpace:any){

    this.spaceEdited.nameSpace = this.data.nameSpace;
    this.spaceEdited.description = this.data.description;
    console.log(this.spaceEdited);

    console.log(`el id por usar es: ${id}`)
    console.log(this.urlM+`space?id=${id}`)
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

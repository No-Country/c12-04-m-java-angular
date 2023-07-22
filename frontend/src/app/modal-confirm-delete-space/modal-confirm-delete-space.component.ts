import { Component,Input  } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-confirm-delete-space',
  templateUrl: './modal-confirm-delete-space.component.html',
  styleUrls: ['./modal-confirm-delete-space.component.scss']
})
export class ModalConfirmDeleteSpaceComponent {

  constructor(private http: HttpClient){}
  @Input() datad: any;
  
  url: string="https://ninja-app-v1-api.azure-api.net/";

  deleteSpaceX(id: number){
    console.log("llega a borrar1")
    console.log(id)
    this.deleteSpace(id).subscribe(
      () => {
        console.log('Objeto eliminado correctamente');
        window.location.reload()
      },
      (error) => {
        console.error('Error al eliminar el objeto', error);
        window.location.reload()
      }
    );
  }

  deleteSpace(idd: number): Observable<any>{
    console.log("llega a borrar2")
    return this.http.delete<any>(this.url+`space?id=${idd}`);
  }
}

import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-modal-edit-space',
  templateUrl: './modal-edit-space.component.html',
  styleUrls: ['./modal-edit-space.component.scss']
})
export class ModalEditSpaceComponent {
  @Input('data') user: any;
}

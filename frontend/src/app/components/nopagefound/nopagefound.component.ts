import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss']
})
export class NopagefoundComponent {
  constructor(private router:Router){}
  redirigir() { //funcion para que cada proyecto rediriga a su propia pagina
    this.router.navigateByUrl(`/home`);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent {
  constructor(private router: Router){}
  redirigir() {
    this.router.navigateByUrl(`/logInAndRegister`);
  }
}

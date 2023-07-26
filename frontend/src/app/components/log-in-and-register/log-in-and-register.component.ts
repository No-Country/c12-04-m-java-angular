import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-and-register',
  templateUrl: './log-in-and-register.component.html',
  styleUrls: ['./log-in-and-register.component.scss']
})
export class LogInAndRegisterComponent {

  constructor(private router: Router){}

  formLogInIsVisible : boolean = false;
  button1Disabled = false;
  button2Disabled = true;

  buttonClicked(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.button1Disabled = true;
      this.button2Disabled = false;
    } else {
      this.button1Disabled = false;
      this.button2Disabled = true;
    }
  }

  redirigir() {
    this.router.navigateByUrl(`/home`);
  }
  switchLogInOrRegister(){
    if(this.formLogInIsVisible==false){
      this.formLogInIsVisible=true;
    }
    else{
      this.formLogInIsVisible=false;
    }
  }
}

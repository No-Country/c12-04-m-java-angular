import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in-and-register',
  templateUrl: './log-in-and-register.component.html',
  styleUrls: ['./log-in-and-register.component.scss']
})
export class LogInAndRegisterComponent {

  formLogInIsVisible: boolean=false;

  switchLogInOrRegister(){
    if(this.formLogInIsVisible==false){
      this.formLogInIsVisible=true;
    }
    else{
      this.formLogInIsVisible=false;
    }
  }
  

}

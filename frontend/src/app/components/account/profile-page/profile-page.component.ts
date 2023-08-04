import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string,
  name: string,
  id: number,
  role: string
}
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  constructor(private router: Router) { }

  showingUserConfigs: User = {
    email: 'javi@gmail.com',
    name: 'Javier',
    id: 1,
    role: 'Desarrollador/a Frontend'
  }

  modalEditUser: boolean = false;
  toggleModalEditUser() {
    this.modalEditUser = !this.modalEditUser;
  }

  userRole: string = this.showingUserConfigs.role;
  userName: string = this.showingUserConfigs.name;

  saveUserConfig(){
    this.showingUserConfigs = {
      id: this.showingUserConfigs.id,
      email: this.showingUserConfigs.email,
      name: this.userName,
      role: this.userRole
    }
    this.toggleModalEditUser();
  }
  modalConfirmDelete: boolean = false;
  toggleModalDelete() {
    this.modalConfirmDelete = !this.modalConfirmDelete;
  }

  redirigirToPasswordRecovery() {
    this.router.navigateByUrl(`PasswordRecovery`);
  }

  redirigirWelcome() {
    this.router.navigateByUrl(`/`);
  }
}

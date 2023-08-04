import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { TasksRoutingModule } from './components/tasks/tasks-routing.module';
import { ProjectComponent} from './components/project-spaces/project/project.component'
import { LogInAndRegisterComponent } from './components/log-in-and-register/log-in-and-register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfilePageComponent } from './components/account/profile-page/profile-page.component';
import { PasswordRecoveryComponent } from './components/account/password-recovery/password-recovery.component';
import { PasswordChangeComponent } from './components/account/password-change/password-change.component';

const routes: Routes = [
	{ path: '', component: WelcomeComponent },
  	{ path: 'home', component: HomePageComponent },
  	{ path: `projects/:proyectoName/:id`, component: ProjectComponent },
  	{ path: 'logInAndRegister', component: LogInAndRegisterComponent },
	{ path: 'profile', component: ProfilePageComponent},
	{ path: 'PasswordRecovery', component: PasswordRecoveryComponent},
	{ path: 'PasswordChange', component: PasswordChangeComponent},
	{
		path: 'tasks',
		loadChildren: () =>
			import('./components/tasks/tasks.module').then(modulo => modulo.TasksModule),
	},
	{ path: '**', component: NopagefoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes), TasksRoutingModule],
	exports: [RouterModule]
})
export class AppRoutingModule { }

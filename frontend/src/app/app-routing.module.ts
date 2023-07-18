import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { TasksRoutingModule } from './components/tasks/tasks-routing.module';
import {ProjectComponent} from './components/project/project.component'

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomePageComponent },
  { path: `projects/:id`, component: ProjectComponent }, //CAMBIAR AL COMPONENTE DE AGUS
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { TasksRoutingModule } from './components/tasks/tasks-routing.module';

const routes: Routes = [
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

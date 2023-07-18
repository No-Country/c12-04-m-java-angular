import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';


const routes: Routes = [
  {
    path: '', 
    // component: ListTasksComponent,
    children: [
      { path: '', component: ListTasksComponent },
      { path: 'add', component: AddEditTaskComponent },
      { path: 'edit/:id', component: AddEditTaskComponent },      				
    ],
  }
  ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }

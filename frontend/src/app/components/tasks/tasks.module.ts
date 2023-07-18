import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module'
import { ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddEditTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TasksModule { }

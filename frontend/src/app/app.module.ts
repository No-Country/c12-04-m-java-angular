import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomePageComponent } from './components/home-page/home-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ModalEditSpaceComponent } from './components/modal-edit-space/modal-edit-space.component';
import { ModalConfirmDeleteSpaceComponent } from './modal-confirm-delete-space/modal-confirm-delete-space.component';
import { ProjectComponent } from './components/project/project.component';
import { LogInAndRegisterComponent } from './components/log-in-and-register/log-in-and-register.component';
import { TasksModule } from './components/tasks/tasks.module';
import { ListTasksComponent } from './components/tasks/list-tasks/list-tasks.component';
import { AddEditTaskComponent } from './components/tasks/add-edit-task/add-edit-task.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';

import { MaterialModule } from '@shared/material.module'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationBarComponent,
    FooterComponent,
    ModalEditSpaceComponent,
    ModalConfirmDeleteSpaceComponent,
    ProjectComponent,
    LogInAndRegisterComponent,
    ListTasksComponent,
    AddEditTaskComponent,
    PresentationPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TasksModule,
    ReactiveFormsModule,
    MaterialModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalEditSpaceComponent } from './modal-edit-space/modal-edit-space.component';
import { ModalConfirmDeleteSpaceComponent } from './modal-confirm-delete-space/modal-confirm-delete-space.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ModalEditSpaceComponent,
    ModalConfirmDeleteSpaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

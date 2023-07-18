import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: HomePageComponent },
  { path: `projects/:id`, component: AppComponent }, //CAMBIAR AL COMPONENTE DE AGUS
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

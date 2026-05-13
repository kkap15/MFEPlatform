import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppListComponent } from './components/app-list/app-list.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { RegisterAppComponent } from './components/register-app/register-app.component';
import { HomeComponent } from './components/HomeComponent/home.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  },
  {
    path: 'apps',
    component: AppListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterAppComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

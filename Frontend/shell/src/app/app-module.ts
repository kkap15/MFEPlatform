import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AuthModule, authHttpInterceptorFn} from '@auth0/auth0-angular'
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppListComponent } from './components/app-list/app-list.component';
import { RegisterAppComponent } from './components/register-app/register-app.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/HomeComponent/home.component';

@NgModule({
  declarations: [
    App,
    AppListComponent,
    RegisterAppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    AuthModule.forRoot({
      domain: 'dev-8tuqxc6l48vlcq83.us.auth0.com',
      clientId: 'RsDTQZ6zXSf8kpqfAPbgNRUXRmADSLIr',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-8tuqxc6l48vlcq83.us.auth0.com/api/v2/',
      },
      httpInterceptor: {
        allowedList: ['http://localhost:5039/api/*']
      },
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn]))
  ],
  bootstrap: [App]
})

export class AppModule { }

import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { catchError, of } from "rxjs";

@Component({
    templateUrl: './home.component.html',
    standalone: false,
    selector: 'landing-page'
}) 

export class HomeComponent {
    public auth = inject(AuthService);
    private router = inject(Router);
    
    constructor() {
        this.auth.isAuthenticated$.pipe(
            catchError(err => {
                console.log(err);
                return of([]);
            }))
            .subscribe(isAuth => {
                if(isAuth) {
                    this.router.navigate(['/apps']);
                }
            });
    }
    
    login() {
        this.auth.loginWithRedirect()
    }
  
    logout() {
        this.auth.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    }
}
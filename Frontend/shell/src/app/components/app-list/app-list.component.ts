import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from "@angular/core";
import { RegisteredApp } from "../../models/registered-app";
import { AppsService } from "../../services/apps-service";
import { Router } from "@angular/router";
import { catchError, of} from "rxjs";
import { loadRemoteModule } from "@angular-architects/native-federation";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './app-list.component.html',
})
export class AppListComponent implements OnInit {
    apps: RegisteredApp[] = [];
    private authService = inject(AuthService);
    
    constructor(private appService: AppsService, private router: Router, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}
    
    ngOnInit(): void {
        this.appService.getAll()
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([])
                }))
            .subscribe(apps => {
                console.log('apps recieved', apps)
                this.apps = apps;
                this.cdr.detectChanges();
                this.wireMfeRoutes(apps);
            });
    }
    
    delete(id: string) {
        this.appService.delete(id)
            .pipe(catchError(err => {
                console.log(err);
                return of([]);
            }))
            .subscribe(() => {
                this.ngZone.run(() => {
                    this.apps = this.apps.filter(a => a.id !== id);
                    this.cdr.detectChanges();
                });
            });
    }
    
    open(app: RegisteredApp) {
        this.router.navigate([app.routePrefix]);
    }
    
    logout() {
        this.authService.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        })
    }
    
    private wireMfeRoutes(apps: RegisteredApp[]) {
        const mfeRouts = apps.map(app => ({
            path: app.routePrefix,
            loadChildren: () => 
                loadRemoteModule({ remoteEntry: app.remoteUrl, exposedModule: app.exposedModule })
                    .then(m => m[app.ngModuleName]),
        }));
        
        this.router.resetConfig([...this.router.config, ...mfeRouts]);
    }
}
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AppsService } from "../../services/apps-service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register',
    standalone: false,
    templateUrl: './register-app.component.html'
})

export class RegisterAppComponent {
    private fb = inject(FormBuilder);
    private appsService = inject(AppsService);
    private router = inject(Router);
    
    form = this.fb.group({
                name: ['', Validators.required],
                displayName: ['', Validators.required],
                remoteUrl: ['', Validators.required],
                exposedModule: ['', Validators.required],
                ngModuleName: ['', Validators.required],
                routePrefix: ['', Validators.required],
            });
    
    submit() {
        if (this.form.invalid) return;
        this.appsService.register(this.form.value as any)
            .subscribe(() => {
                this.router.navigate(['/apps']);
            }
        );
    }
}
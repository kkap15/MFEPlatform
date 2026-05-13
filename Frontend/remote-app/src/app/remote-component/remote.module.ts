import { NgModule } from "@angular/core";
import { RemoteComponent } from "./remote.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [RemoteComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: RemoteComponent
            }
        ])
    ],
})

export class RemoteModule {}
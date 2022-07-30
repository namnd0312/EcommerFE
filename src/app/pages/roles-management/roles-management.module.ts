import {RolesManagementComponent} from "./roles-management.component";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SharedModule} from "../../share/shared.module";

@NgModule({
    declarations: [
        RolesManagementComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                // canActivate: [AuthGuard],
                component: RolesManagementComponent,
            }
        ]),
    ],
})
export class RolesManagementModule {
}

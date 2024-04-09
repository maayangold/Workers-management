import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RoleService } from "./role.service";
import { NgModule } from "@angular/core";
import { AddRoleComponent } from "./add-role/add-role.component";
import { RoleRoutingModule } from "./role-routing.module";
import { JwtInterceptor } from "src/app/jwt-interceptor.component";
import { EditRoleComponent } from "./edit-role/edit-role.component";

@NgModule({
    declarations: [AddRoleComponent, EditRoleComponent],
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        RoleRoutingModule


    ],
    providers: [RoleService
        , { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    ],
    exports: [AddRoleComponent],
})
export class RolesModule {
}

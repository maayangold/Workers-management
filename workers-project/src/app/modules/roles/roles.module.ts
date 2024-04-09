import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RoleService } from "./role.service";
import { NgModule } from "@angular/core";
import { AddRoleComponent } from "./add-role/add-role.component";
import { RoleRoutingModule } from "./role-routing.module";
import { JwtInterceptor } from "src/app/jwt-interceptor.service";
import { EditRoleComponent } from "./edit-role/edit-role.component";
import { AuthInterceptor } from "src/app/auth-interceptor.service";

@NgModule({
    declarations: [AddRoleComponent, EditRoleComponent],
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        RoleRoutingModule


    ],
    providers: [RoleService ,
         { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
         { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },


    ],
    exports: [AddRoleComponent],
})
export class RolesModule {
}

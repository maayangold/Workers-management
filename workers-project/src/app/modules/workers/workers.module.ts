import { NgModule } from "@angular/core";
import { WorkerService } from "./worker.service";
import { WorkerRoutingModule } from "./worker-routing.module";
import { WorkersListComponent } from "./workers-list/workers-list.component";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { EditWorkerComponent } from "./edit-worker/edit-worker.component";
import { AddWorkerComponent } from "./add-worker/add-worker.component";
import { JwtInterceptor } from "src/app/jwt-interceptor.service";
import { AddRoleToWorkerComponent } from "./add-role-to-worker/add-role-to-worker.component";
import { WorkerDetailsComponent } from "./worker-details/worker-details.component";
import { AuthInterceptor } from "src/app/auth-interceptor.service";


@NgModule({
    declarations: [WorkersListComponent, WorkerDetailsComponent, EditWorkerComponent, AddWorkerComponent,AddRoleToWorkerComponent],
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        WorkerRoutingModule,
        
        
    ],

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        WorkerService,
        DatePipe
    ],
    exports: [WorkersListComponent],
})
export class WorkersModule {
}
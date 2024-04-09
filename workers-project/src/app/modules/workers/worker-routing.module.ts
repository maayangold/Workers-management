import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { EditWorkerComponent } from './edit-worker/edit-worker.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { AddRoleToWorkerComponent } from './add-role-to-worker/add-role-to-worker.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { WorkersListComponent } from './workers-list/workers-list.component';


const ROUTES: Route[] = [
  { path: "", component: WorkersListComponent, pathMatch: "full", canActivate: [AuthGuardService] },
  { path: "workers", component: WorkersListComponent, canActivate: [AuthGuardService] },
  { path: 'workerDetails/:id', component: WorkerDetailsComponent },
  { path: "add", component: AddWorkerComponent },
  { path: "addRoleTo", component: AddRoleToWorkerComponent },
  { path: 'edit/:id', component: EditWorkerComponent },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }

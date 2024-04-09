import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';


const ROUTES: Route[] = [
  { path: "", component: AddRoleComponent,pathMatch: "full", canActivate: [AuthGuardService] },
  { path: "roles", component:AddRoleComponent,canActivate: [AuthGuardService] },
  { path: 'edit/:id', component:EditRoleComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }

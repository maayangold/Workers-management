import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Route[] = [
  { path: "", component: HomePageComponent, pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "workers", loadChildren: () => import("./modules/workers/workers.module").then(m => m.WorkersModule) },
  { path: "roles", loadChildren: () => import("./modules/roles/roles.module").then(m => m.RolesModule) },
  { path: "about", component: AboutPageComponent },
  { path: "**", component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

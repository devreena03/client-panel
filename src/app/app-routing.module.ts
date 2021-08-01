import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { SettingComponent } from './components/setting/setting.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'client/add', component: AddClientComponent, canActivate:[AuthGuard]},
  {path:'client/edit/:id', component: EditClientComponent, canActivate:[AuthGuard]},
  {path:'client/:id', component: ClientDetailsComponent, canActivate:[AuthGuard]},
  {path:'setting', component: SettingComponent, canActivate:[AuthGuard]},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

//Autor: Sajiel Ahmad, Merlin Burbach
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CsvUploadComponent } from './components/csv-upload/csv-upload.component';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: "full"},
  { path: 'csv', component: CsvUploadComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  { path: 'registration', component: RegistrationComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

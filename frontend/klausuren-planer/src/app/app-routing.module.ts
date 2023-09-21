import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: "full"},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'csv', component: CsvUploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

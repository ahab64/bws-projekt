import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/student/student.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AuthService } from './services/auth.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TeacherComponent,
    AdminComponent,
    StudentComponent,
    CalendarComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

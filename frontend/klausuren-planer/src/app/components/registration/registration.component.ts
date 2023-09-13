import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserExtended } from 'src/app/models/userExtended.model';
import { Kurs } from 'src/app/models/kurs.model';
import * as CryptoJS from 'crypto-js';
import { UserRolle } from 'src/app/enums/userRollen.enum';
import { RegistrationService } from 'src/app/services/registration.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  klassenstufen = ['10', '11', '12', '13']; // Hier können Sie die verfügbaren Klassenstufen hinzufügen/ändern
  kursliste: Kurs[] = [
    { name: 'Mathe', lehrer: 'Max Mustermann' },
    { name: 'Sport', lehrer: 'Sarah Mustermann' },
    { name: 'Deutsch', lehrer: 'Max Mustermann' },
    { name: 'Bio', lehrer: 'Max Mustermann' },
  ]; // Hier können Sie die verfügbaren Kurse hinzufügen/ändern

  user: UserExtended = {
    name: '',
    email: '',
    password: '',
    kurse: [],
    rolle: typeof UserRolle,
  };
  registrationFailed: boolean = false;
  isRegistered: boolean = false;

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.registrationForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      rolle: '',
      klasse: '',
      kurse: [''],
    });
  }

  onChangeKursliste(event: any, kurs: Kurs) {
    if (event.target.checked) {
      // Add the course to the user's selected courses
      this.user.kurse.push(kurs);
    } else {
      // Remove the course from the user's selected courses
      const index = this.user.kurse.findIndex(
        (selected: Kurs) => selected.name === kurs.name
      );
      if (index !== -1) {
        this.user.kurse.splice(index, 1);
      }
    }
  }

  onSubmit() {
    const name = this.registrationForm.get('name')?.value;
    const email = this.registrationForm.get('email')?.value;
    const password = this.registrationForm.get('password')?.value;
    const rolle = this.registrationForm.get('rolle')?.value;
    this.user.name = name;
    this.user.email = email;
    this.user.password = password;
    this.user.kurse;
    this.user.rolle = rolle;

    console.log(
      this.user.name,
      this.user.email,
      this.user.password,
      this.user.kurse,
      this.user.rolle
    );

    this.registrationService.registration(this.user).pipe(
      catchError((error) => {
        this.registrationFailed = true;
        console.error('Fehler bei der Anmeldung', error)
        return throwError(() => error);
      })
    )
    .subscribe((response) => {
      this.isRegistered = true;
      console.log(response)
    })
  }
  }


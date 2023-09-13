import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserExtended } from 'src/app/models/userExtended.model';
import { Kurs } from 'src/app/models/kurs.model';
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
  isInValid: boolean = false;

  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
      rolle: new FormControl('', [Validators.required]),
      klasse: new FormControl('', [Validators.required]),
      kurse: new FormControl(''),
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
    if (this.registrationForm.valid && this.user.kurse.length > 0) {
      this.isInValid = false;

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

      this.registrationService
        .registration(this.user)
        .pipe(
          catchError((error) => {
            this.registrationFailed = true;
            console.error('Fehler beim Registrieren', error);
            return throwError(() => error);
          })
        )
        .subscribe((response) => {
          this.isRegistered = true;
          console.log(response);
        });
    } else {
      console.log('Invalid Form')
      this.isInValid = true;
    }
  }
}

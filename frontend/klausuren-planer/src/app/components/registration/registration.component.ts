//Autor: Merlin Burbach
import { Component, OnInit } from '@angular/core';
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
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { TextContentService } from 'src/app/services/text-content.service';
import { Router } from '@angular/router';

//Registrations Komponente
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  klassenstufen = ['10', '11', '12', '13']; 
  kursliste: Kurs[] = [
  ]; 

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
  loadingKurseFailed: boolean = false;
  textInhalte: any;

  registrationForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private textContentService: TextContentService
  ) {
    // Initialisiere das RegistrationFormular mit Validierungen
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(6)]),
      rolle: new FormControl('', [Validators.required]),
      klasse: new FormControl('', [Validators.required]),
      kurse: new FormControl(''),
    });
  }

  ngOnInit() {
    this.textContentService.getTextContents().subscribe((data) => {
      this.textInhalte = data;
    });
  }

  // Behandelt die Änderung der Klassenstufe und lädt die Kursliste
  async onChangeStufe(): Promise<Kurs[]> {
    console.log('haloooo')
    try {
      const stufe = this.registrationForm.get('klasse')?.value;
      console.log(stufe)
      const $kurse = await lastValueFrom(
        this.registrationService.getKurse(stufe),
      );
      console.log($kurse)
      this.kursliste = $kurse;
      return $kurse;
    } catch (error) {
      this.loadingKurseFailed = true;
      this.kursliste = [];
      throw error
      
    }
  }

  // Behandelt die Änderung der ausgewählten Kurse
  onChangeKursliste(event: any, kurs: Kurs) {
    if (event.target.checked) {
      // Add the course to the user's selected courses
      this.user.kurse.push(kurs);
    } else {
      // Remove the course from the user's selected courses
      const index = this.user.kurse.findIndex(
        (selected: Kurs) => selected === kurs
      );
      if (index !== -1) {
        this.user.kurse.splice(index, 1);
      }
    }
  }

  // Behandelt das Absenden des Registrierungsformulars
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

      this.registrationService
        .registration(this.user)
        .pipe(
          catchError((error) => {
            this.registrationFailed = true;
            return throwError(() => error);
          })
        )
        .subscribe((response) => {
          this.isRegistered = true;
        });
    } else {
      this.isInValid = true;
    }
  }

  // Navigiert zur Anmeldeseite
  onAnmelden(){
    this.router.navigate(['/'])
  }
}

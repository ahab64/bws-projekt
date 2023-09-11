import { Component, OnInit } from '@angular/core';
import { UserRolle } from 'src/app/enums/userRollen.enum';
import { UserExtended } from 'src/app/models/userExtended.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserExtended = {
    name: '',
    email: '',
    password: '',
    kurse: [],
    rolle: UserRolle.Student,
  }

  class: string = '';

  kursliste: [] = [];

  constructor() {
  
    
  }
  
  ngOnInit(){
      
  };

  onSubmit() {
    
  }

}

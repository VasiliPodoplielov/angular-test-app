import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  cardTitle: string = 'Registration';
  buttonLinkTitle: string = 'Login';
  buttonLink: string = '/auth/login';
  mainButtonTitle: string = 'Register';
}

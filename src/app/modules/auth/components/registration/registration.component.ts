import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    console.log(this.registrationForm.value);
  }

  getEmailError(): string | void {
    const emailControl = this.registrationForm.controls.email;

    if (emailControl.hasError('required')) {
      return 'Field is required';
    }

    if (emailControl.hasError('email')) {
      return 'Field should be valid email';
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormGroup } from './models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cardTitle: string = 'Login';
  buttonLinkTitle: string = 'Registration';
  buttonLink: string = '/auth/registration';
  mainButtonTitle: string = 'Sign in';

  formGroup: LoginFormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }

  getEmailError(): string | void {
    const emailControl = this.formGroup.controls.email;

    if (emailControl.hasError('required')) {
      return 'Field is required';
    }

    if (emailControl.hasError('email')) {
      return 'Field should be valid email';
    }
  }
}

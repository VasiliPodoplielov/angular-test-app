import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  getEmailError(): string | void {
    const emailControl = this.loginForm.controls.email;

    if (emailControl.hasError('required')) {
      return 'Field is required';
    }

    if (emailControl.hasError('email')) {
      return 'Field should be valid email';
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginFormGroup } from './models';
import { fieldErrorsMap } from '../../../../constants';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  onSubmit(): void {
    const { email, password } = this.formGroup.controls;

    if (!this.formGroup.valid) return;

    this.authService.signIn({
      email: email.value || '',
      password: password.value || '',
    }).subscribe(); // TODO: add redirect to somewhere and update cache with credentials
  }

  protected readonly fieldErrorsMap = fieldErrorsMap;
}

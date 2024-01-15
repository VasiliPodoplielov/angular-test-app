import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FIELD_ERRORS_MAP } from '../../../../constants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  formGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
  ) {
  }

  onSubmit(): void {
    const { email, password } = this.formGroup.controls;

    if (!this.formGroup.valid) return;

    this.authService.signIn({
      email: email.value || '',
      password: password.value || '',
    }).subscribe((response) => {
      if (response.user) {
        this.router.navigate([''])
      }
    });
  }

  protected readonly fieldErrorsMap = FIELD_ERRORS_MAP;
}

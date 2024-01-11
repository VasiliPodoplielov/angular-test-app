import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FIELD_ERRORS_MAP } from '../../../../constants';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

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
    // firstName: ['', [Validators.required]],
    // lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
  ) {
  }

  onSubmit() {
    const { email, password } = this.registrationForm.controls;

    if (!this.registrationForm.valid) return;

    this.authService.signUp({
      email: email.value || '',
      password: password.value || '',
    }).subscribe((response) => {
      if (response.user) {
        this.router.navigate(['/auth/login']);
      }
    })
  }

  protected readonly fieldErrorsMap = FIELD_ERRORS_MAP;
}

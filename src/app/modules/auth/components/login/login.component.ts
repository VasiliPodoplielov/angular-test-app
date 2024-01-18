import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FIELD_ERRORS_MAP } from '../../../../constants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AUTH_CARD_WIDTH } from '../../../common-ui/ui-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    if (!this.formGroup.valid) return;

    const { email, password } = this.formGroup.controls;

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
  protected readonly AUTH_CARD_WIDTH = AUTH_CARD_WIDTH;
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FIELD_ERRORS_MAP } from '../../../../constants';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AUTH_CARD_WIDTH } from '../../../common-ui/ui-constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  formGroup = this.fb.group({
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
    if (!this.formGroup.valid) return;

    const { email, password } = this.formGroup.controls;

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
  protected readonly AUTH_CARD_WIDTH = AUTH_CARD_WIDTH;
}

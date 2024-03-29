import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './authRoutes';
import { MatCardModule } from '@angular/material/card';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MatCardModule,
    CommonUiModule,
    ReactiveFormsModule,
    MatInputModule,
    CardModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastComponent } from './components/toast/toast.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ToastComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    CardModule,
    ButtonModule
  ]
})
export class CommonUiModule { }

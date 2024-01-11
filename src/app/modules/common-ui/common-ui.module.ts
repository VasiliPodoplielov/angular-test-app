import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterCardWrapperComponent } from './components/center-card-wrapper/center-card-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [
    CenterCardWrapperComponent,
    ToastComponent,
  ],
  exports: [
    CenterCardWrapperComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class CommonUiModule { }

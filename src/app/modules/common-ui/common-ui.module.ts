import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterCardWrapperComponent } from './components/center-card-wrapper/center-card-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { InputErrorTextComponent } from './input-error-text/input-error-text.component';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    CenterCardWrapperComponent,
    InputErrorTextComponent,
  ],
  exports: [
    CenterCardWrapperComponent,
    InputErrorTextComponent
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

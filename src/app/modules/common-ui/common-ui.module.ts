import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterCardWrapperComponent } from './components/center-card-wrapper/center-card-wrapper.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CenterCardWrapperComponent,
  ],
  exports: [
    CenterCardWrapperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    RouterLink,
    MatButtonModule
  ]
})
export class CommonUiModule { }

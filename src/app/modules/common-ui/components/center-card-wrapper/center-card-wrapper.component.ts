import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-center-card-wrapper',
  templateUrl: './center-card-wrapper.component.html',
  styleUrls: ['./center-card-wrapper.component.css']
})
export class CenterCardWrapperComponent {
  @Input() title: string = '';
  @Input() buttonLink: string = '';
  @Input() buttonLinkTitle: string = '';
  @Input() mainButtonTitle: string = '';
}

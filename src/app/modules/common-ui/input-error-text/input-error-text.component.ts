import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-text',
  templateUrl: './input-error-text.component.html',
  styleUrls: ['./input-error-text.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InputErrorTextComponent implements OnChanges {
  @Input() errors: any;


  @Input() control: AbstractControl<any, any>;
  @Input() controlName: string;

  getErrorText() {
    // console.log(this.control);
    // if (this.control.hasError('required')) {
    //   return 'Field is required';
    // }
    //
    // if (this.control.hasError('email')) {
    //   return 'Field should be valid email';
    // }

    return '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

import { FormControl, FormGroup } from '@angular/forms';

export interface LoginFormFields {
  email: FormControl<string | null>,
  password: FormControl<string | null>,
}

export type LoginFormGroup = FormGroup<LoginFormFields>;

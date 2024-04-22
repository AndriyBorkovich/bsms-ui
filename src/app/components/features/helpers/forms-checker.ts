import { FormGroup } from "@angular/forms";

export class FormsChecker {
    public static controlHasError(customForm: FormGroup,controlName: string, errorName: string) {
      return customForm.controls[controlName].hasError(errorName);
    }
  }
  
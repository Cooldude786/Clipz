import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return(group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName)
      const matchingControl = group.get(matchingControlName)

      if (!control || !matchingControl) {
        console.error(`Form controls can not be found in the form group.`);
        return { controlNotFound: false }
      }

      const error = control.value === matchingControl.value ? null : { noMatch: true }
      matchingControl.setErrors(error)

      return error
    }
  }
}


// use of static method is we don't need to create instance of it to use. (Think of "public static void main" class of java)
// new RegisterValidators.match() <~ Without static
// RegisterValidators.match() <~ With static

// IMP:- static methods don't have access to object's properties or method since we are not creating an instance of the class

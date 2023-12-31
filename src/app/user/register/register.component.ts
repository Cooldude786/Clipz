import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showAlert:boolean = false
  alertMsg:string = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  inSubmission = false

  constructor(private authService: AuthService, private emailTaken: EmailTaken) {}

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ], [this.emailTaken.validate]),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(12),
      Validators.max(120)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    ]),
    confirm_password: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13)
    ]),
  }, [RegisterValidators.match('password', 'confirm_password')])

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.authService.createUser(this.registerForm.value as IUser)
    } catch(e: any) {
      console.log("Error >>> ", e);
      this.alertMsg = 'An unexpected error occurred. Please try again.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }

    this.alertMsg = 'Success! Your account has been created.'
    this.alertColor = 'green'
  }

}

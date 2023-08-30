import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  showAlert:boolean = false
  alertMsg:string = "Please wait! You're is being logged in."
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AngularFireAuth) {}

  async login() {
    this.showAlert = true
    this.alertMsg = "Please wait! We are logging you in."
    this.alertColor = 'blue'
    this.inSubmission = true

    await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    .then(() => {
      this.showAlert = true
      this.alertMsg = "Success! You are now logged in."
      this.alertColor = 'green'
      this.inSubmission = false
    })
    .catch((error) => {
      var errorCode = error.code;
      this.showAlert = true
      this.alertMsg = formatError(errorCode)
      this.alertColor = "red"
      this.inSubmission = false
    })

  }

}

function formatError(errorCode: string) {
  switch(errorCode) {
    case "auth/user-not-found":
      return "The entered email is not registered with us."
    case "auth/wrong-password":
      return "Please enter the correct password."
    case "auth/user-disabled":
      return "The user with the entered email is disabled by an administrator."
    default:
      return "An unexpected error occurred. Please try again."
  }
}

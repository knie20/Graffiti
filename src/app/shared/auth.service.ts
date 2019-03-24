import { UserService } from '~/app/shared/user.service';
import { Injectable } from "@angular/core";
import { User } from "./user.model";

const Firebase = require("nativescript-plugin-firebase");

@Injectable()
export class AuthService {

  constructor(private users: UserService) {

  }

  signUp(user) {
    Firebase.createUser({
      email: user.email,
      password: user.password
    }).then((user) => {
      this.users.createNewUser(user);
    }).catch(err => {
      console.log(err);
    });
  }

  login(user) {

    console.log(`Logging in ${user.email}`);

    Firebase.login(
      {
        type: Firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: user.email,
          password: user.password
        }
      })
      .then(result => JSON.stringify(result))
      .catch(error => console.log(error));
  }

  logout() {
    Firebase.logout();
  }

  resetPassword(email: string) {
    Firebase.sendPasswordResetEmail(email)
    .then(() => console.log("Password reset email sent"))
    .catch(error => console.log("Error sending password reset email: " + error));
  }

}

import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class UserService {
    register(user) {

    }

    login(user) {

        console.log(`Logging in ${user.email}`);

        firebase.login(
            {
              type: firebase.LoginType.PASSWORD,
              passwordOptions: {
                email: user.email,
                password: user.password
              }
            })
            .then(result => JSON.stringify(result))
            .catch(error => console.log(error));
    }

    getCurrentUser(){
      return firebase.getCurrentUser();
    }

    resetPassword(email: string) {

    }

    handleErrors() {

    }
}

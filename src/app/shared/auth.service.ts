import { Injectable } from "@angular/core";
const Firebase = require("nativescript-plugin-firebase");

@Injectable()
export class AuthService {
    
    register(user) {
    
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

    }

}

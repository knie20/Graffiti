
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, AfterContentChecked } from "@angular/core";
import { Router } from "@angular/router";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";

import { UserService } from "~/app/shared/user.service";
import { AuthService } from "~/app/shared/auth.service.ts";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    isLoggingIn = true;
    user;

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(private page: Page, private authService: AuthService, private userService: UserService, private router: Router) {
        this.page.actionBarHidden = true;
        this.user = {
            email: "",
            password: ""
        }
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.authService.login(this.user);
    }

    signUp() {
        this.authService.signUp(this.user);
    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                this.authService.resetPassword(data.text.trim());
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "APP NAME",
            okButtonText: "OK",
            message: message
        });
    }
}


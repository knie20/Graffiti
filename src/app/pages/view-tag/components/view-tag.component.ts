import { Component, ElementRef, OnInit } from "@angular/core";

import { Router, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
selector: "app-view-tag",
templateUrl: "./view-tag.component.html"
})
export class ViewTagComponent implements OnInit {


constructor(
  private router: Router, 
  private routerExtensions: RouterExtensions
  ) {}

ngOnInit() {

}

};

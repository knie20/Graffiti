import { TagService } from '~/app/shared/tag.service';
import { Component, OnInit, Output } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import * as app from "tns-core-modules/application";
import { Router, ActivatedRoute } from '@angular/router';

import { firestore } from "nativescript-plugin-firebase";


@Component({
  selector: 'app-view-tag',
  moduleId: module.id,
  templateUrl: './view-tag.component.html'
})
export class ViewTagComponent implements OnInit {

  private tagId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tags: TagService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.tagId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}
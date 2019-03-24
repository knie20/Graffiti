import { TagService } from '~/app/shared/tag.service';
import { Component, OnInit, Output } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import * as app from "tns-core-modules/application";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-tag',
  moduleId: module.id,
  templateUrl: './view-tag.component.html'
})
export class ViewTagComponent implements OnInit {

  private tagId: string;

  @Output("tag")
  tag: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private tags: TagService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.tagId = this.route.snapshot.params['id'];
    this.tag = {};
  }

  ngOnInit(): void {

    console.log(`Tag ID from params: `, this.tagId);

    console.log(`Getting tags by ID... `);
    this.tags.getById(this.tagId).then(tag => {
        const tagData = tag.data();
        const tagObject = { id: tag.id, ...tagData };
        this.tag = tagObject;
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}
import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-create-comment-fab',
  templateUrl: './create-comment-fab.component.html',
  styleUrls: ['./create-comment-fab.component.scss']
})
export class CreateCommentFabComponent implements OnInit {

  @ViewChild('fab') fab: ElementRef;

  @Input("tagId") tagId: any;

  constructor(private routerExtensions: RouterExtensions) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  onCreateCommentFabTap() {
    console.log(`Create comment Fab tapped!`);
    this.routerExtensions.navigate([`/create-comment/tag-id/${this.tagId}`]);
  }
}
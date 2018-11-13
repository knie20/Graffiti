import { ITag } from './../../../interfaces/tag.interfaces';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView);


@Component({
  selector: 'app-google-maps',
  moduleId: module.id,
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  mapView: MapView;

  constructor() { }

  ngOnInit() {
  }

    //Map events
    onMapReady = (event) => {

      this.mapView = event.object;

      this.generateTags(this.mapView, this.tags);
    };

    generateTags = (mapView: MapView, tags: any[]) => {

    };


    tags = [
      {
        type: 'text',
        position: Position.positionFromLatLng(39.128050, -84.523169),
        upvotes: 12,
        downvotes: 2
      }, {
        type: 'video',
        position: Position.positionFromLatLng(39.128150, -84.522769),
        upvotes: 4,
        downvotes: 2
      }, {
        type: 'image',
        position: Position.positionFromLatLng(39.128450, -84.523169),
        upvotes: 7,
        downvotes: 1
      }, {
        type: 'audio',
        position: Position.positionFromLatLng(39.128350, -84.523069),
        upvotes: 102,
        downvotes: 24
      }, {
        type: 'video',
        position: Position.positionFromLatLng(39.128125, -84.523269),
        upvotes: 12,
        downvotes: 2
      }, {
        type: 'text',
        position: Position.positionFromLatLng(39.128150, -84.522569),
        upvotes: 11,
        downvotes: 0
      }, 
    ]
}

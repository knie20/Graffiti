  import { Component, ElementRef, OnInit, ViewChild, NO_ERRORS_SCHEMA } from "@angular/core";
  import {registerElement } from "nativescript-angular/element-registry";
  import * as geolocation from "nativescript-geolocation";
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
  import { MapTagService } from "../../services/map-tag.service";
  import { ITag } from "./../../../interfaces/tag.interfaces";

// Important - must register MapView plugin in order to use in Angular templates
  registerElement("MapView", () => MapView);

  @Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html"
})
export class GoogleMapsComponent implements OnInit {
  mapView: MapView;
  markers: Array<Marker>;
  currentLocation: geolocation.Location;
  currentLocationMarker: Marker;

  tags = [
    {
      type: "text",
      position: Position.positionFromLatLng(39.128050, -84.523169),
      upvotes: 12,
      downvotes: 2
    }, {
      type: "video",
      position: Position.positionFromLatLng(39.128150, -84.522769),
      upvotes: 4,
      downvotes: 2
    }, {
      type: "photo",
      position: Position.positionFromLatLng(39.128450, -84.523169),
      upvotes: 7,
      downvotes: 1
    }, {
      type: "sound",
      position: Position.positionFromLatLng(39.128350, -84.523069),
      upvotes: 102,
      downvotes: 24
    }, {
      type: "video",
      position: Position.positionFromLatLng(39.128125, -84.523269),
      upvotes: 12,
      downvotes: 2
    }, {
      type: "text",
      position: Position.positionFromLatLng(39.128150, -84.522569),
      upvotes: 11,
      downvotes: 0
    }
  ];

  constructor(private mapTagService: MapTagService) {

  }

  ngOnInit() { }

  // Map events
  onMapReady = (event) => {

    this.currentLocation = this.mapTagService.getCurrentLocation();

    this.mapView = event.object;

    this.markers = this.mapTagService.generateMapTag(this.tags);

    this.markers.forEach((m) => {
      this.mapView.addMarker(m);
    });

    this.mapTagService.generateMarker(this.currentLocation, "bluedot_small");
  }

}

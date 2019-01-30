  import { Component, ElementRef, OnInit } from "@angular/core";
  import { registerElement } from "nativescript-angular/element-registry";
  import * as geolocation from "nativescript-geolocation";
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
  import { MapTagService } from "../../services/map-tag.service";
  import { ITag } from "../../../../interfaces/tag";

// Important - must register MapView plugin in order to use in Angular templates
  registerElement("MapView", () => MapView);

  @Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html"
})
export class GoogleMapsComponent implements OnInit {
  mapView: MapView;
  markers: Array<Marker>;
  currentLocation: Position;
  currentLocationMarker: Marker;

  tags = [
    {
      type: "text",
      position: Position.positionFromLatLng(39.130054, -84.516755),
      upvotes: 12,
      downvotes: 2
    }, {
      type: "video",
      position: Position.positionFromLatLng(39.130434, -84.516255),
      upvotes: 4,
      downvotes: 2
    }, {
      type: "photo",
      position: Position.positionFromLatLng(39.130194, -84.516005),
      upvotes: 7,
      downvotes: 1
    }, {
      type: "sound",
      position: Position.positionFromLatLng(39.130890, -84.516295),
      upvotes: 102,
      downvotes: 24
    }, {
      type: "video",
      position: Position.positionFromLatLng(39.129954, -84.515855),
      upvotes: 12,
      downvotes: 2
    }, {
      type: "text",
      position: Position.positionFromLatLng(39.130514, -84.516355),
      upvotes: 11,
      downvotes: 0
    }
  ];

  constructor(private mapTagService: MapTagService) {

  }

  ngOnInit() {
    this.currentLocation = Position.positionFromLatLng(39.130554, -84.516155);
   }

  // Map events
  onMapReady = (event) => {

    this.mapView = event.object;
    this.mapView.latitude = this.currentLocation.latitude;
    this.mapView.longitude = this.currentLocation.longitude;
    this.mapView.zoom = 17;

    this.markers = this.mapTagService.generateMapTag(this.tags);

    this.markers.forEach((m) => {
      this.mapView.addMarker(m);
    });

    this.currentLocationMarker = this.mapTagService.generateMarker(this.currentLocation, "bluedot_small");
    this.mapView.addMarker(this.currentLocationMarker);
  }

}

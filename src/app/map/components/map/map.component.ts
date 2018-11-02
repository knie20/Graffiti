import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

import { Image } from "ui/image";
import { ImageSource } from "image-source";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView);


@Component({
  selector: 'app-map',
  moduleId: module.id,
  templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
  mapView: MapView;

  constructor() { }

  ngOnInit() {
  }

    //Map events
    onMapReady = (event) => {

      this.mapView = event.object;
      
      var imageSource: ImageSource = new ImageSource;
      imageSource.fromResource("custommarker");
      let image = new Image();
      image.imageSource = imageSource;

      var markers:any[] = [
        {
          "lat": 39.124173,
          "long": -84.516864,
          "title": "Here",
          "icon": "custommarker"
        }
      ];

      markers.forEach(m => {
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(m.lat, m.long);
        marker.title = m.title;
        marker.icon = m.icon;
        this.mapView.addMarker(marker);
      });
    };

}

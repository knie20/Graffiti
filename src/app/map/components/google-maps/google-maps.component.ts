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

      var markers:any[] = [
        {
          "lat": 39.124173,
          "long": -84.516864,
          "title": "Here"
        }
      ];

      markers.forEach(m => {
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(m.lat, m.long);
        marker.title = m.title;
        this.mapView.addMarker(marker);
      });
    };

}

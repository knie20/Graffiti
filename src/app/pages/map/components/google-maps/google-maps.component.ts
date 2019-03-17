  import { Component, ElementRef, OnInit } from "@angular/core";
  import { registerElement } from "nativescript-angular/element-registry";
  import { Location, watchLocation} from "nativescript-geolocation";
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
  import { MapTagService } from "../../services/map-tag.service";
  import { ITag } from "./../../../../interfaces/tag.interfaces";
  import * as geolocation from "nativescript-geolocation";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView);

@Component({
  selector: "app-google-maps",
  templateUrl: "./google-maps.component.html"
})
export class GoogleMapsComponent implements OnInit {
  mapView: MapView;
  markers: Array<Marker>;
  currentLocation: Location;
  currentLocationMarker: Marker;
  watchId: number;

  public startWatchingLocation = () => {
    this.watchId = watchLocation(
      loc => {
        if(loc) {
          this.currentLocationMarker.position.latitude = loc.latitude;
          this.currentLocationMarker.position.longitude = loc.longitude;

          this.mapView.latitude = loc.latitude;
          this.mapView.longitude = loc.longitude;

          console.log(new Date() + ': ' + loc.latitude + ' ' + loc.longitude);
        };
      }, 
      error => {
      console.log(error);
      }, 
      { updateTime: 20 * 1000, updateDistance: 5 }
    );
  }

  public stopWatchingLocation = () => {
    if(this.watchId) {
        geolocation.clearWatch(this.watchId);
        this.watchId = null;
    }
  }

  

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

  constructor(private mapTagService: MapTagService) {}

  ngOnInit() {
    this.startWatchingLocation();  
  }

  // Map events
  onMapReady = (event) => {
    
    this.mapView = event.object;

    this.mapTagService.getCurrentLocation().then(location => {
      this.mapView.latitude = location.latitude;
      this.mapView.longitude = location.longitude;
      this.mapView.zoom = 17;
      
      
      this.markers = this.mapTagService.generateMapTag(this.tags);

      this.markers.forEach((m) => {
        this.mapView.addMarker(m);
      });

      this.currentLocationMarker = this.mapTagService.generateMarker(location, "bluedot_small");
      this.mapView.addMarker(this.currentLocationMarker);
    });
  }

}

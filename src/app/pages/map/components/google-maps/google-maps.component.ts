  import { Component, ElementRef, OnInit } from "@angular/core";
  import { registerElement } from "nativescript-angular/element-registry";
  import { Location, watchLocation} from "nativescript-geolocation";
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
  import { MapTagService } from "../../services/map-tag.service";
  import { ITag } from "./../../../../interfaces/tag.interfaces";
  import * as geolocation from "nativescript-geolocation";

  import { Router, NavigationEnd } from "@angular/router";
  import { RouterExtensions } from "nativescript-angular/router";

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
  tags: ITag[];

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

  constructor(
    private mapTagService: MapTagService, 
    private router: Router, 
    private routerExtensions: RouterExtensions
    ) {}

  ngOnInit() {
    this.startWatchingLocation();  
  }

  onMarkerSelect = (event) => {
    this.routerExtensions.navigate(["/view-tag"], { queryParams: { id: 1}});
  };

  // Map events
  onMapReady = (event) => {
    this.mapView = event.object;

    
    this.mapTagService.getCurrentLocation().then(location => {
      this.mapView.latitude = location.latitude;
      this.mapView.longitude = location.longitude;
      this.mapView.zoom = 17;
      
      this.tags = this.mapTagService.getTags(location);
      this.markers = this.mapTagService.generateMapTag(this.tags);

      this.markers.forEach((m) => {
        this.mapView.addMarker(m);
      });

      this.currentLocationMarker = this.mapTagService.generateMarker(location, "bluedot_small");
      this.mapView.addMarker(this.currentLocationMarker);
    });
  };

}

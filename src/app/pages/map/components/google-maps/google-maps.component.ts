  import { Component, ElementRef, OnInit } from "@angular/core";
  import { registerElement } from "nativescript-angular/element-registry";
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
  import { MapTagService } from "../../services/map-tag.service";

  import * as geolocation from "nativescript-geolocation";
  import { Router } from "@angular/router";
  import { RouterExtensions } from "nativescript-angular/router" ;
  
  var style = require('./google-maps-style.json');

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

  watchId: number;
  tags: any[];

  constructor(
    private mapTagService: MapTagService,
    private router: Router, 
    private routerExtensions: RouterExtensions) 
  { }

  ngOnInit() {
    this.startWatchingLocation();
  }

  onMarkerSelect = (event) => {
    this.routerExtensions.navigate([`view-tag/id`, event.marker.userData ]);
  }

  // Map events
  onMapReady = (event) => {

    this.mapView = event.object

    this.mapTagService.getCurrentLocation().then( location => {
      this.mapView.latitude = location.latitude;
      this.mapView.longitude = location.longitude;
      this.mapView.zoom = 17;
      this.mapView.setStyle(style);
      this.currentLocationMarker = this.mapTagService.generateMarker(location, "bluedot");
      this.mapView.addMarker(this.currentLocationMarker);

      this.mapTagService.getTags(location)
      .then(snapshot => {
        const tags = [];

        snapshot.forEach(doc => {
          const tag = { id: doc.id, ...doc.data() };
          tags.push(tag);
        });

        this.tags = tags;
        
        this.markers = this.mapTagService.generateMapTag(this.tags);

        this.markers.forEach((m) => {
          this.mapView.addMarker(m);
        });
      })
      .catch((err) => {
        console.log(`Boo hoo, couldn't get the tags.`);
      })
    });
  }

  startWatchingLocation(){
    this.watchId = geolocation.watchLocation(location => {
      if(location && this.currentLocationMarker) {
        
        console.log(`Updating marker position...`);
        this.currentLocationMarker.position = Position.positionFromLatLng(location.latitude, location.longitude)

        console.log(`Getting tags from tag service...`);
        this.mapTagService.getTags(location)
        .then(snapshot => {
          const tags = [];
  
          snapshot.forEach(doc => {
            const tag = { id: doc.id, ...doc.data() };
            tags.push(tag)
          })
  
          this.tags = tags;
          
          this.markers = this.mapTagService.generateMapTag(this.tags)
  
          this.markers.forEach((m) => {
            this.mapView.addMarker(m)
          })
        })
        .catch((err) => {
          console.log(`Boo hoo, couldn't get the tags.`);
        })
      }
    }, err => {
      console.log(err)
    }, {
      desiredAccuracy: 3, 
      updateDistance: 5, 
      minimumUpdateTime : 1000 * 5
    })
  }

  stopWatchingLocation = () => {
    if(this.watchId) {
        geolocation.clearWatch(this.watchId)
        this.watchId = null
    }
  }

}

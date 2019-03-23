<<<<<<< HEAD
  import { Component, ElementRef, OnInit } from "@angular/core"
  import { registerElement } from "nativescript-angular/element-registry"
  import { Location, watchLocation} from "nativescript-geolocation"
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk"
  import { MapTagService } from "../../services/map-tag.service"
  import { ITag } from "./../../../../interfaces/tag.interfaces"
  import * as geolocation from "nativescript-geolocation"
  import * as Firebase from "nativescript-plugin-firebase/app"

  import { Router, NavigationEnd } from "@angular/router"
  import { RouterExtensions } from "nativescript-angular/router" 
  import { firestore } from "nativescript-plugin-firebase"
=======
  import { Component, ElementRef, OnInit } from "@angular/core";
  import { registerElement } from "nativescript-angular/element-registry";
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
  import { MapTagService } from "../../services/map-tag.service";
>>>>>>> dev-7

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView)

@Component({
  moduleId: module.id,
  selector: "app-google-maps",
  templateUrl: "google-maps.component.html"
})
export class GoogleMapsComponent implements OnInit {
<<<<<<< HEAD
  mapView: MapView
  markers: Array<Marker>
  currentLocation: Location
  currentLocationMarker: Marker
  watchId: number
  tags: ITag[]
=======
  
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
>>>>>>> dev-7

  constructor(
    private mapTagService: MapTagService, 
    private router: Router, 
    private routerExtensions: RouterExtensions
    ) {}

  ngOnInit() { 
    this.startWatchingLocation()
  }

  onMarkerSelect = (event) => {
    this.routerExtensions.navigate(['/view-tag', event.marker.userData ])
  }

  // Map events
  onMapReady = (event) => {
    this.mapView = event.object

      
      this.mapTagService.getCurrentLocation().then( location => {
        this.mapView.latitude = location.latitude
        this.mapView.longitude = location.longitude
        this.mapView.zoom = 17
        
        this.mapTagService.getTags(location)
        .then(snapshot => {
          const tags = []

          snapshot.forEach(doc => {
            let tag = { id: doc.id, ...doc.data() }
            tags.push(tag)
          })

          this.tags = tags
          
          this.markers = this.mapTagService.generateMapTag(this.tags)

          this.markers.forEach((m) => {
            this.mapView.addMarker(m)
          })
        })

        this.currentLocationMarker = this.mapTagService.generateMarker(location, "bluedot_small")
        this.mapView.addMarker(this.currentLocationMarker)
    })
  }

  public startWatchingLocation(){
    this.watchId = geolocation.watchLocation(location => {
      if(location && this.currentLocationMarker) {
        this.currentLocationMarker.position = Position.positionFromLatLng(
          location.latitude,
          location.longitude
      )
      }
    }, err => {
      console.log(err)
    }, {
      desiredAccuracy: 3, 
      updateDistance: 5, 
      minimumUpdateTime : 1000 * 5
    })
  }

  public stopWatchingLocation = () => {
    if(this.watchId) {
        geolocation.clearWatch(this.watchId)
        this.watchId = null
    }
  }
}

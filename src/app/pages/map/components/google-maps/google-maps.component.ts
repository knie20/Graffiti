  import { Component, ElementRef, OnInit } from "@angular/core"
  import { registerElement } from "nativescript-angular/element-registry"
  import { Location, watchLocation} from "nativescript-geolocation"
  import { MapView, Marker, Position } from "nativescript-google-maps-sdk"
  import { MapTagService } from "../../services/map-tag.service"
  import { ITag } from "./../../../../interfaces/tag.interfaces"
  import * as geolocation from "nativescript-geolocation"

  import { Router } from "@angular/router"
  import { RouterExtensions } from "nativescript-angular/router" 

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView)

@Component({
  moduleId: module.id,
  selector: "app-google-maps",
  templateUrl: "google-maps.component.html"
})
export class GoogleMapsComponent implements OnInit {
  mapView: MapView
  markers: Array<Marker>
  currentLocation: Location
  currentLocationMarker: Marker
  watchId: number
  tags: ITag[]


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

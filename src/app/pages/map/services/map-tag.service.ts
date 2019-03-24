import { Injectable } from "@angular/core"
import { ImageSource } from "image-source"
import * as geolocation from "nativescript-geolocation"
import { Marker, Position } from "nativescript-google-maps-sdk"
import { Accuracy } from "tns-core-modules/ui/enums"
import { Image } from "ui/image"
import { Location, watchLocation, clearWatch } from "nativescript-geolocation"
import { firestore } from 'nativescript-plugin-firebase'

@Injectable()
export class MapTagService {
    defaultCoordinateDistance = 0.02
    
    getCurrentLocation = (): Promise<geolocation.Location> => {

        console.log(`Getting current location...`);
        geolocation.isEnabled().then(isEnabled => {
            if (!isEnabled) {
                geolocation.enableLocationRequest().then(() => { }, (e) => {
                    console.log("Error: " + (e.message || e))
                })
            }
            
            if(isEnabled){
                console.log(`We're good to go with the geo stuff`);
            }
        })

        return geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            updateTime: 1000,
            maximumAge: 5000,
            timeout: 20000
        })
    }

    watchCurrentLocation = (successCallback): any => {
        return watchLocation(
            successCallback,
            (e) => {
                console.log("Error: " + (e.message || e))
            },
            {
                desiredAccuracy: 3, 
                updateDistance: 10, 
                minimumUpdateTime : 1000 * 20
            }
        )
    }

    stopWatchCurrentLocation = (watchId: number): void => {
        if(watchId){
            clearWatch(watchId)
        }
    }

    getTags = (currentLocation: Location): Promise<firestore.QuerySnapshot> => {
        const tagsCollection = firestore.collection("tags")
        return tagsCollection.get()
    }

    generateMapTag = (tags: Array<any>): Array<Marker> => {
        const markers: Array<Marker> = []
        const imageSource: ImageSource = new ImageSource()

        tags.forEach((tag) => {
            imageSource.fromResource("map_marker_" + tag.type)
            let image = new Image()
            image.imageSource = imageSource

            let marker = new Marker()
            marker.userData = tag.id
            marker.position = Position.positionFromLatLng(
                tag.location.latitude,
                tag.location.longitude
            )
            marker.title = tag.title
            marker.icon = image

            markers.push(marker)
        })

        return markers
    }

    generateMarker = (location: Location, imagePath: string): Marker => {
        const markers: Array<Marker> = []
        const imageSource: ImageSource = new ImageSource()
        imageSource.fromResource(imagePath)
        const image = new Image()
        image.imageSource = imageSource

        const marker = new Marker()
        marker.position = Position.positionFromLatLng(location.latitude, location.longitude)
        marker.icon = image

        return marker
    }
}
import { Injectable } from "@angular/core";
import { ImageSource } from "image-source";
import * as geolocation from "nativescript-geolocation";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import { Accuracy } from "tns-core-modules/ui/enums";
import { Image } from "ui/image";
import { ITag } from "~/app/interfaces/tag.interfaces";

import * as Firebase from "nativescript-plugin-firebase/app";
import { Location, watchLocation, clearWatch } from "nativescript-geolocation";
import { P } from "@angular/core/src/render3";

@Injectable()
export class MapTagService {
    defaultCoordinateDistance = 0.02;
    tagsCollection = Firebase.firestore().collection("tags");

    getCurrentLocation = (): Promise<geolocation.Location> => {

        geolocation.isEnabled().then(isEnabled => {
            if (!isEnabled) {
                geolocation.enableLocationRequest().then(() => { }, (e) => {
                    console.log("Error: " + (e.message || e));
                });
            }
        });

        return geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            updateTime: 1000,
            maximumAge: 5000,
            timeout: 20000
        });
    }

    watchCurrentLocation = (successCallback): void => {
        watchLocation(
            successCallback,
            (e) => {
                console.log("Error: " + (e.message || e));
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
            clearWatch(watchId);
        }
    }

    getTags = (currentLocation: Location): Array<ITag> => {
        var tags: any[] = [];

        this.tagsCollection
            .where("position.latitude", ">", currentLocation.latitude - this.defaultCoordinateDistance)
            .where("position.latitude", "<", currentLocation.latitude + this.defaultCoordinateDistance)
            .where("position.longitude", ">", currentLocation.longitude - this.defaultCoordinateDistance)
            .where("position.longitude", "<", currentLocation.longitude + this.defaultCoordinateDistance)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    tags.push(doc);
                })
            });

        return tags;
    };

    generateMapTag = (tags: Array<any>): Array<Marker> => {
        const markers: Array<Marker> = [];
        const imageSource: ImageSource = new ImageSource();

        tags.forEach((tag) => {
            imageSource.fromResource("map_marker_" + tag.type);
            const image = new Image();
            image.imageSource = imageSource;

            const marker = new Marker();
            marker.position = tag.position;
            marker.title = tag.title;
            marker.icon = image;

            markers.push(marker);
        });

        return markers;
    }

    generateMarker = (location: Location, imagePath: string): Marker => {
        const markers: Array<Marker> = [];
        const imageSource: ImageSource = new ImageSource();
        imageSource.fromResource(imagePath);
        const image = new Image();
        image.imageSource = imageSource;

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(location.latitude, location.longitude);
        marker.icon = image;

        return marker;
    }
}

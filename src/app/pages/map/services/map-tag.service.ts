import { Injectable } from "@angular/core";
import { ImageSource } from "tns-core-modules/image-source";
import * as geolocation from "nativescript-geolocation";
import { Marker, Position } from "nativescript-google-maps-sdk";
import { Accuracy } from "tns-core-modules/ui/enums";
import { Image } from "tns-core-modules/ui/image";

@Injectable()
export class MapTagService {

    getCurrentLocation = (): Promise<geolocation.Location> => {

        geolocation.isEnabled().then(isEnabled => {
            if (!isEnabled) {
                geolocation.enableLocationRequest().then(() => { }, (e) => {
                    console.log("Error: " + (e.message || e));
                });
            }
        }, e => {
            console.log("Error: " + (e.message || e));
        });

        return geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            updateTime: 1000,
            maximumAge: 5000,
            timeout: 20000
        });
    }

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

    generateMarker = (location: any, imagePath: string): Marker => {
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

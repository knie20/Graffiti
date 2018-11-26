import { Injectable } from "@angular/core";
import { ImageSource } from "image-source";
import * as geolocation from "nativescript-geolocation";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import { Accuracy } from "tns-core-modules/ui/enums";
import { Image } from "ui/image";
import { ITag } from "~/app/interfaces/tag.interfaces";

@Injectable()
export class MapTagService {

    getCurrentLocation = (): geolocation.Location => {
        let location: geolocation.Location;

        geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            updateTime: 1000
        }).then((data) => {
            location = data;
        });

        return location;
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

    generateMarker = (location: geolocation.Location, imagePath: string): Marker => {
        const markers: Array<Marker> = [];
        const imageSource: ImageSource = new ImageSource();
        imageSource.fromResource(imagePath);
        const image = new Image();
        image.imageSource = imageSource;

        const marker = new Marker();
        marker.position.latitude = location.latitude;
        marker.position.longitude = location.longitude;
        marker.icon = image;

        return marker;
    }
}

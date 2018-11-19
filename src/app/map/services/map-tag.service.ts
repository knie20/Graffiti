import { Image } from 'ui/image';
import { ImageSource } from 'image-source';
import { MapView, Marker } from 'nativescript-google-maps-sdk';
import { Injectable } from '@angular/core';
import { ITag } from '~/app/interfaces/tag.interfaces';

@Injectable()
export class MapTagService {

    generateMapTag = (tags: any[]): Marker[] => {
        const markers: Marker[] = [];
        const imageSource: ImageSource = new ImageSource;

        tags.forEach(tag => {
            imageSource.fromResource('map_marker_photo');
            let image = new Image();
            image.imageSource = imageSource;

            let marker = new Marker();
            marker.position = tag.position;
            marker.title = tag.title;
            marker.icon = image;

            markers.push(marker);
        });

        return markers;
    }
}
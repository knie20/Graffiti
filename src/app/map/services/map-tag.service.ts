import { Image } from 'ui/image';
import { ImageSource } from 'image-source';
import { MapView, Marker } from 'nativescript-google-maps-sdk';
import { Injectable } from '@angular/core';
import { ITag } from '~/app/interfaces/tag.interfaces';

@Injectable()
export class MapTagService {

    public generateMapTag = (mapView: MapView, tags: ITag[]) => {
        tags.forEach(tag => {
            let imageSource: ImageSource = new ImageSource;
            imageSource.fromResource('map+marker' + tag.type);
            let image = new Image();
            image.imageSource = imageSource;

            let marker = new Marker();
            marker.position = tag.position;
            marker.title = tag.title;
            marker.icon = image;
            mapView.addMarker(marker);

        })
    }
}
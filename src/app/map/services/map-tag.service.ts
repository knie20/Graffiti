import { MapView, Marker } from 'nativescript-google-maps-sdk';
import { Injectable } from '@angular/core';
import { ITag } from '~/app/interfaces/tag.interfaces';
import { fromResource } from 'tns-core-modules/image-source/image-source';

@Injectable()
export class MapTagService {

    public generateMapTag = (mapView: MapView, tags: ITag[]) => {
        tags.forEach(tag => {
            let marker = new Marker();
            marker.position = tag.position;
            marker.title = tag.title;
            marker.icon = 'marker_icon_' + tag.type;

        })
    }
}
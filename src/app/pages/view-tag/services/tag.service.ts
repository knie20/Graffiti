import { Injectable } from "@angular/core";
import { ImageSource } from "image-source";
import * as geolocation from "nativescript-geolocation";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import { Accuracy } from "tns-core-modules/ui/enums";
import { Image } from "ui/image";
import { ITag } from "~/app/interfaces/tag.interfaces";

import * as Firebase from "nativescript-plugin-firebase/app";
import { Location, watchLocation, clearWatch } from "nativescript-geolocation";

@Injectable()
export class ViewTagService {

}
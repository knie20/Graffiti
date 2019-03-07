import { Injectable } from "@angular/core";
import * as Firebase from "nativescript-plugin-firebase";

@Injectable()
export class UserService {

  usersCollection = Firebase.firestore.collection("users");
  currentUser: any;

    constructor(){
      this.currentUser = this.getCurrentUser();
    }

    getCurrentUser(){
      return Firebase.getCurrentUser();
    }

    getPhotoByUserId(userId) {
      return Firebase.storage.getDownloadUrl({
        // optional, can also be passed during init() as 'storageBucket' param so we can cache it
        bucket: "gs://ucitsd-graffiti-1.appspot.com",
        // the full path of an existing file in your Firebase storage
        remoteFullPath: `userPhotos/${userId}`
      });
    }

}

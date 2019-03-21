import { Component, NgZone, Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";

const firebaseApp = require("nativescript-plugin-firebase");

import * as firebase from "nativescript-plugin-firebase/app";
import { firestore } from "nativescript-plugin-firebase";

import { UserProfile } from './user-profile';

@Injectable()
export class UserService {

  storage = firebase.storage().ref();

  constructor() {
    
  }

  getCurrentUser(){
   return firebaseApp.getCurrentUser();
  }

  createNewUser(user){
    console.log(`Creating a new user...`)
    
    const usersCollection = firebase.firestore().collection("users");

    return usersCollection.doc(user.uid).set({
      id: user.uid,
      displayName: `New User`,
      handle: user.email,
      signature: `Hello. I am new to Graffiti. Be nice.`,
      photo: `res://logo`,
      backgroundPhoto: `res://logo`,
      settings: {
          anonymous: false,
          allowEmailNotify: true,
          allowPushNotify: true,
          agreeToTerms: true,
          appTheme: `OG`,
          mapTheme: `Silver`,
          typography: `Roboto`,
      },
      tags: [``],
      groups: [``],
      following: [``],
      followers: [``]
    });
  }

  updateUser(userId, userData){
    const usersCollection = firebase.firestore().collection("users");

    return usersCollection.doc(userId).update({
      displayName: `${userData.firstName} ${userData.lastName}`,
      handle: userData.handle,
      signature: userData.signature
    });
  }

  updateUserSettings(userId, userSettings){
    const usersCollection = firebase.firestore().collection("users");

    return usersCollection.doc(userId).update({
      settings: userSettings
    });
  }

  getDisplayNameById(userId): Promise<firestore.QuerySnapshot> {
    console.log(`Getting display name...`);
    console.log(`UserId: `, userId);

    const query: firestore.Query = firebase.firestore().collection("users")
        .where("userId", "==", userId);

    return query.get();
  }

  getById(userId: string): Promise<firestore.DocumentSnapshot> {
    return firebase.firestore().collection("users").doc(userId).get();
  }

  getManyById(userIds): Promise<firestore.QuerySnapshot> {
    console.log(`Getting user...`);
    console.log(`UserId: `, userIds);

    const query: firestore.Query = firebase.firestore().collection("users");

    return query.get();
  }

  getFollowingByUserId(userId): Promise<firestore.QuerySnapshot> {
    console.log(`Getting user following...`);
    console.log(`UserId: `, userId);

    const query: firestore.Query = firebase.firestore().collection("users")
      .where("userId", "==", userId);

    return query.get();
  }

  getUserPhotoById(userId) {
    return this.storage.child(`userPhotos/${userId}`).getDownloadURL();
  }

}
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

  follow(userId, data){
    const followingCollection = firebase.firestore().collection("users").doc(userId).collection("following");
    return followingCollection.doc(data.id).set({
      displayName: data.displayName,
      handle: data.handle,
      photoURL: data.photoURL
    });
  }

  addToFollowers(userId, data){
    const followersCollection = firebase.firestore().collection("users").doc(userId).collection("followers");
    return followersCollection.doc(data.id).set({
      displayName: data.displayName,
      handle: data.handle,
      photoURL: data.photoURL
    });
  }

  unfollow(userId, data){
    const followingCollection = firebase.firestore().collection("users").doc(userId).collection("following");    
    return followingCollection.doc(data.id).delete();
  }

  //userID: the person you're leaving
  removeFromFollowers(userId, data){
    const followersCollection = firebase.firestore().collection("users").doc(userId).collection("followers");    
    return followersCollection.doc(data.id).delete();
  }

  getDisplayNameById(userId): Promise<firestore.QuerySnapshot> {
    const query: firestore.Query = firebase.firestore().collection("users")
        .where("userId", "==", userId);

    return query.get();
  }

  getById(userId: string): Promise<firestore.DocumentSnapshot> {
    return firebase.firestore().collection("users").doc(userId).get();
  }

  getManyById(userIds): Promise<firestore.QuerySnapshot> {
    const query: firestore.Query = firebase.firestore().collection("users");
    return query.get();
  }

  getFollowingByUserId(userId): Promise<firestore.QuerySnapshot> {
    const following = firebase.firestore().collection("users").doc(userId).collection("following");
    return following.get();
  }

  getFollowersByUserId(userId): Promise<firestore.QuerySnapshot> {
    const followers = firebase.firestore().collection("users").doc(userId).collection("followers");
    return followers.get();
  }

  getUserPhotoById(userId) {
    return this.storage.child(`userPhotos/${userId}`).getDownloadURL();
  }

}
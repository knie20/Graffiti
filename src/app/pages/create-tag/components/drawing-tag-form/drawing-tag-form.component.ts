import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PaintPad } from 'nativescript-paint';
import { ColorPicker } from 'nativescript-color-picker';
import { Slider } from "tns-core-modules/ui/slider";
import { UserService } from '~/app/shared/user.service';
import { CreateTagService } from '../../services/create-tag-service';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { GroupFilterModalComponent } from '../group-filter-modal/group-filter-modal.component';

import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
const Firebase = require('nativescript-plugin-firebase/app');

@Component({
	selector: 'app-drawing-tag-form',
	moduleId: module.id,
	templateUrl: './drawing-tag-form.component.html',
})
export class DrawingTagFormComponent implements OnInit {

	myPaintPad: PaintPad;
	colorPicker: ColorPicker;
	drawWidth: number;
	drawColor: string;
	drawOpacity: number;
	maxOpacity: number;
	airBrushFlow: number;
	paintingImage: {};
	
	@ViewChild('PaintPad') 
	PaintPad: ElementRef;

	userPhotoUrl: string;
	userId: string;
	tagGroup: any;

	constructor(
		private users: UserService, 
		private tag: CreateTagService, 
		private modalService: ModalDialogService, 
		private viewContainerRef: ViewContainerRef
	){
		this.colorPicker = new ColorPicker();

		const self: DrawingTagFormComponent = this;
		users.getCurrentUser().then((user) => {
				
				self.userId = user.uid;

				users.getUserPhotoById(user.uid)
				.then(url => {
						self.userPhotoUrl = url;
				}).catch(err => {
						self.userPhotoUrl = `res://ic_hacker`;
				})
		})
	}

	ngOnInit(): void {
		this.drawOpacity = 255;
		this.maxOpacity = 255;
		this.drawWidth = 5;
		this.airBrushFlow = 0.7;
		this.drawColor = "#3489db";
	}

	getMyPainting() {
		this.myPaintPad = this.PaintPad.nativeElement;
		this.myPaintPad.getPainting().then(img => {
			this.paintingImage = img;

			const self: DrawingTagFormComponent = this;

			geolocation
			.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 20000 })
			.then(value => {

					const latitude = value.latitude;
					const longitude = value.longitude;
					const position = Firebase.firestore().GeoPoint(latitude, longitude);
					
					const type = "painting";

					const drawingTag = {
							userId: self.userId,
							groupId: this.tagGroup? this.tagGroup.id : null,
							postedOn: new Date(),
							updatedOn: new Date(),
							type: type,
							text: null,
							imageUrl: null,
							videoUrl: null,
							position: position
					};
	
					this.tag.createTag(this.userId, drawingTag, this.paintingImage);
			})

		});
	}

	clearMyPainting() {
		this.myPaintPad = this.PaintPad.nativeElement;
		this.myPaintPad.clearPainting();
		this.paintingImage = null;
	}

	widthChange(event){
		this.myPaintPad = this.PaintPad.nativeElement;
		const slider = <Slider>event.object;
    this.drawWidth = slider.value;
	}

	opacityChange(event){
		this.myPaintPad = this.PaintPad.nativeElement;
		const slider = <Slider>event.object;
    this.drawOpacity = slider.value;
	}

	pickColor() {
		this.colorPicker
			.show('#3489db', 'HEX')
			.then((color: string) => {
				this.drawColor = color;
			})
			.catch(err => {
				console.log(err);
			});
	}

	onFilterButtonTap() {

		const options: ModalDialogOptions = {
				viewContainerRef: this.viewContainerRef,
				fullscreen: false,
				context: {}
		};

		this.modalService.showModal(GroupFilterModalComponent, options).then(filterValue => {
				this.tagGroup = filterValue;
		});
}
}
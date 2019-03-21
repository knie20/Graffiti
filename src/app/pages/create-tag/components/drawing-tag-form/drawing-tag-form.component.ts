import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PaintPad } from 'nativescript-paint';
import { ColorPicker } from 'nativescript-color-picker';
import { Slider } from "tns-core-modules/ui/slider";

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

	constructor(){
		this.colorPicker = new ColorPicker();
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
}
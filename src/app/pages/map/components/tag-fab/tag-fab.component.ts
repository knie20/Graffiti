import { Component, OnInit } from "@angular/core";
import {trigger, state, style, transition, animate, keyframes} from "@angular/animations";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "TagFab",
    moduleId: module.id,
    templateUrl: "./tag-fab.component.html",
    styleUrls: ["./tag-fab.component.css"],
    animations: [
        trigger('state', [
            state('active', style({ transform: 'rotate(45)' })),
            state('inactive', style({ transform: 'rotate(0)' })),
            transition('inactivebtn => activebtna', [
                animate('280ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0)'}),
                    style({opacity: 1, transform: 'translateX(70)'})                
                ]))
            ]),
            transition('inactivebtn => activebtnb', [
                 animate('280ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateX(0)'}),
                    style({opacity: 1, transform: 'translateY(-80)'})
                ]))
            ]),
            transition('inactivebtn => activebtnc', [
                 animate('280ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0)'}),
                    style({opacity: 1, transform: 'translateX(-70)'}),
                    
                ]))
            ]),
            transition('activebtna => inactivebtn', [
               animate('280ms ease-out', keyframes([
                    style({opacity: 0, transform: 'translateX(0)'}),
                    style({opacity: 0, transform: 'translateY(0)'})
                ]))
            ]),
            transition('activebtnb => inactivebtn', [
                 animate('280ms ease-out', keyframes([
                    style({opacity: 0, transform: 'translateX(0)'}),
                    style({opacity: 0, transform: 'translateY(0)'})
                ]))
            ]),
            transition('activebtnc => inactivebtn', [
                 animate('280ms ease-out', keyframes([
                    style({opacity: 0, transform: 'translateX(0)'}),
                    style({opacity: 0, transform: 'translateY(0)'})
                ]))
            ])
        ]) 
    ] 
})
export class TagFabComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    fabTap() {
        console.log('tapped');
    }

}

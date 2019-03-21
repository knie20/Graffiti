import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { Image } from "tns-core-modules/ui/image";
import { Button } from "tns-core-modules/ui/button";

import { Router, NavigationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";

import * as app from "tns-core-modules/application";

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
                    style({ opacity: 1, transform: 'translateY(0)' }),
                    style({ opacity: 1, transform: 'translateX(70)' })
                ]))
            ]),
            transition('inactivebtn => activebtnb', [
                animate('280ms ease-in', keyframes([
                    style({ opacity: 1, transform: 'translateX(0)' }),
                    style({ opacity: 1, transform: 'translateY(-80)' })
                ]))
            ]),
            transition('inactivebtn => activebtnc', [
                animate('280ms ease-in', keyframes([
                    style({ opacity: 1, transform: 'translateY(0)' }),
                    style({ opacity: 1, transform: 'translateX(-70)' }),

                ]))
            ]),
            transition('activebtna => inactivebtn', [
                animate('280ms ease-out', keyframes([
                    style({ opacity: 0, transform: 'translateX(0)' }),
                    style({ opacity: 0, transform: 'translateY(0)' })
                ]))
            ]),
            transition('activebtnb => inactivebtn', [
                animate('280ms ease-out', keyframes([
                    style({ opacity: 0, transform: 'translateX(0)' }),
                    style({ opacity: 0, transform: 'translateY(0)' })
                ]))
            ]),
            transition('activebtnc => inactivebtn', [
                animate('280ms ease-out', keyframes([
                    style({ opacity: 0, transform: 'translateX(0)' }),
                    style({ opacity: 0, transform: 'translateY(0)' })
                ]))
            ])
        ])
    ]
})
export class TagFabComponent implements OnInit {

    @ViewChild('fab') fab: ElementRef;

    @ViewChild('btna') buttonA: ElementRef;
    @ViewChild('btnb') buttonB: ElementRef;
    @ViewChild('btnc') buttonC: ElementRef;
    @ViewChild('btnd') buttonD: ElementRef;

    isFabOpen = false;

    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {

    }

    fabTap(fab) {
        console.log('tapped');
        let createTagFab = fab;
        let button1: Button = this.buttonA.nativeElement;
        let button2: Image = this.buttonB.nativeElement;
        let button3: Image = this.buttonC.nativeElement;
        let button4: Image = this.buttonD.nativeElement;

        this.animate(createTagFab, button1, button2, button3, button4);
    }

    doThis() {
        console.log('tapped');
    }

    animate(createTagFab, button1, button2, button3, button4) {

        let definitions = new Array<AnimationDefinition>();

        if(this.isFabOpen) {
            let a1: AnimationDefinition = {
                target: button1,
                translate: { x: 0, y: 0 }, 
                opacity: 1, 
                duration: 400, 
                delay: 0
            };
    
            definitions.push(a1);
    
            let a2: AnimationDefinition = {
                target: button2,
                translate: { x: 0, y: 0 }, 
                opacity: 1, 
                duration: 440, 
                delay: 0
            };
    
            definitions.push(a2);
    
            let a3: AnimationDefinition = {
                target: button3,
                translate: { x: 0, y: 0 }, 
                opacity: 1, 
                duration: 440, 
                delay: 0
            };
    
            definitions.push(a3);
    
            let a4: AnimationDefinition = {
                target: button4,
                translate: { x: 0, y: 0 }, 
                opacity: 1, 
                duration: 440, 
                delay: 0
            };
            
            definitions.push(a4);
    
            let a5: AnimationDefinition = {
                target: createTagFab,
                rotate: 0, 
                duration: 400, 
                delay: 0
            };
            
            definitions.push(a5);

        } else {
            let a1: AnimationDefinition = {
                target: button1,
                translate: { x: 0, y: -74 }, 
                opacity: 1, 
                duration: 400, 
                delay: 0
            };
    
            definitions.push(a1);
    
            let a2: AnimationDefinition = {
                target: button2,
                translate: { x: 0, y: -148 }, 
                opacity: 1, 
                duration: 440, 
                delay: 0
            };
    
            definitions.push(a2);
    
            let a3: AnimationDefinition = {
                target: button3,
                translate: { x: 0, y: -222 }, 
                opacity: 1, 
                duration: 440, 
                delay: 0
            };
    
            definitions.push(a3);
    
            let a4: AnimationDefinition = {
                target: button4,
                translate: { x: 0, y: -296 }, 
                opacity: 1, 
                duration: 440, 
                delay: 0
            };
            
            definitions.push(a4);
    
            let a5: AnimationDefinition = {
                target: createTagFab,
                rotate: 45, 
                duration: 400, 
                delay: 0
            };
            
            definitions.push(a5);
        }

        let animationSet = new Animation(definitions);

        animationSet.play()
            .then(() => {
                if(this.isFabOpen){
                    this.isFabOpen = false;
                } else {
                    this.isFabOpen = true;
                }
                console.log("Animation finished");
            })
            .catch((e) => {
                console.log(e.message);
            });
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            animated: false
        });
        
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}

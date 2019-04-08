import { MapFilterModalComponent } from './components/map-filter-modal/map-filter-modal.component';
import { Component, OnInit, Output, ViewContainerRef } from "@angular/core";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Map",
    moduleId: module.id,
    templateUrl: "./map.component.html"
})
export class MapComponent implements OnInit {

    @Output() filterValue: string;

    constructor(private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
        this.filterValue = 'none';
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onFilterButtonTap() {

        const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {}
        };

        this.modalService.showModal(MapFilterModalComponent, options).then(filterValue => {
            this.filterValue = filterValue;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}

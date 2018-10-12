import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "map", loadChildren: "~/app/map/map.module#MapModule" },
    { path: "profile", loadChildren: "~/app/pages/profile/profile.module#ProfileModule" },
    { path: "groups", loadChildren: "~/app/pages/groups/groups.module#GroupsModule" },
    { path: "settings", loadChildren: "~/app/pages/settings/settings.module#SettingsModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

// NativeScript Modules
import { NativeScriptRouterModule } from "nativescript-angular/router";

// Angular Modules
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: "~/app/pages/login/login.module#LoginModule" },
    { path: "map", loadChildren: "~/app/pages/map/map.module#MapModule" },
    { path: "profile", loadChildren: "~/app/pages/profile/profile.module#ProfileModule" },
    { path: "groups", loadChildren: "~/app/pages/groups/groups.module#GroupsModule" },
    { path: "settings", loadChildren: "~/app/pages/settings/settings.module#SettingsModule" },
    { path: "create-tag/:url", loadChildren: "~/app/pages/create-tag/create-tag.module#CreateTagModule" },
    { path: "view-tag", loadChildren: "~/app/pages/view-tag/view-tag.module#ViewTagModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

import { Injectable } from "@angular/core"
import { firestore } from "nativescript-plugin-firebase";

@Injectable()
export class ViewTagService {
    getTag = (id: string): Promise<firestore.QuerySnapshot> => {
        const tagsCollection = firestore.collection("tags")
        return tagsCollection.get()
    }
}

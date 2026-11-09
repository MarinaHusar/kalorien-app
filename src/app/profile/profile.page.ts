import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/angular";
import { UserProfile } from "../services/user-profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class ProfilePage {
  profile = inject(UserProfile);
}

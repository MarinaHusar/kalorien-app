import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonButtons,
} from "@ionic/angular";
import { UserProfile } from "../services/user-profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  imports: [
    IonButton,
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
    IonBackButton,
    IonButtons,
  ],
})
export class ProfilePage {
  profile = inject(UserProfile);
  private router = inject(Router);

  save(): void {
    this.profile.save();
    this.router.navigateByUrl("/home");
  }
}

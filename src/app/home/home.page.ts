import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/angular";
import { Diary } from "../services/diary";
import { UserProfile } from "../services/user-profile";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {
  diary = inject(Diary);
  profile = inject(UserProfile);

  get remainingCalories(): number {
    return this.profile.targets.calories - this.diary.getTotals().calories;
  }
}

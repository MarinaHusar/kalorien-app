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
import { Water } from "../services/water";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {
  diary = inject(Diary);
  profile = inject(UserProfile);
  water = inject(Water);

  get glasses(): number[] {
    const needed = Math.max(this.water.goalMl, this.water.amountMl);
    const count = Math.ceil(needed / 250);
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  get remainingCalories(): number {
    return this.profile.targets.calories - this.diary.getTotals().calories;
  }

  get ringDash(): string {
    const target = this.profile.targets.calories;
    const eaten = this.diary.getTotals().calories;
    const progress = Math.min(eaten / target, 1);
    const circumference = 339.3;
    return `${progress * circumference} ${circumference}`;
  }

  percent(value: number, target: number): number {
    return Math.min((value / target) * 100, 100);
  }
}

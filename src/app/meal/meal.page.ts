import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/angular";
import { Diary, MealType } from "../services/diary";

@Component({
  selector: "app-meal",
  templateUrl: "./meal.page.html",
  styleUrls: ["./meal.page.scss"],
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
})
export class MealPage {
  diary = inject(Diary);
  private route = inject(ActivatedRoute);

  meal = this.route.snapshot.paramMap.get("type") as MealType;

  titles: Record<MealType, string> = {
    breakfast: "Frühstück",
    lunch: "Mittagessen",
    dinner: "Abendessen",
    snack: "Snack",
  };

  get title(): string {
    return this.titles[this.meal];
  }

  get entries() {
    return this.diary.entries.filter((entry) => entry.meal === this.meal);
  }

  get calories(): number {
    return this.diary.getMealCalories(this.meal);
  }
}

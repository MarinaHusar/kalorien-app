import { Component, inject } from "@angular/core";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/angular";
import { Diary } from "../services/diary";
import { UserProfile } from "../services/user-profile";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.page.html",
  styleUrls: ["./statistics.page.scss"],
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class StatisticsPage {
  private diary = inject(Diary);
  private profile = inject(UserProfile);

  days = this.diary.getCaloriesForLastDays(7);
  goal = this.profile.targets.calories;

  get maxValue(): number {
    return Math.max(this.goal, ...this.days.map((day) => day.calories));
  }

  barHeight(calories: number): number {
    return (calories / this.maxValue) * 100;
  }

  get average(): number {
    const filled = this.days.filter((day) => day.calories > 0);
    if (filled.length === 0) {
      return 0;
    }
    const sum = filled.reduce((total, day) => total + day.calories, 0);
    return Math.round(sum / filled.length);
  }
}

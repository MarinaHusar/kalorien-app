import { Component, inject } from "@angular/core";
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular";
import { Diary } from "../services/diary";
import { UserProfile } from "../services/user-profile";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  diary = inject(Diary);
  profile = inject(UserProfile);

  constructor() {
    // Temporary test data, we will remove it later
    if (this.diary.entries.length === 0) {
      this.diary.addEntry({
        name: "Test lunch",
        meal: "lunch",
        grams: 280,
        calories: 245,
        protein: 6,
        fat: 7,
        carbs: 37,
      });
    }
  }

  get remainingCalories(): number {
    return this.profile.targets.calories - this.diary.getTotals().calories;
  }
}

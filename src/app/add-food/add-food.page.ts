import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/angular";
import { Diary, MealType } from "../services/diary";

@Component({
  selector: "app-add-food",
  templateUrl: "./add-food.page.html",
  styleUrls: ["./add-food.page.scss"],
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    FormsModule,
  ],
})
export class AddFoodPage {
  private diary = inject(Diary);
  private router = inject(Router);

  name = "";
  meal: MealType = "lunch";
  grams = 100;
  caloriesPer100 = 0;
  proteinPer100 = 0;
  fatPer100 = 0;
  carbsPer100 = 0;

  save(): void {
    const factor = this.grams / 100;
    this.diary.addEntry({
      name: this.name,
      meal: this.meal,
      grams: this.grams,
      calories: Math.round(this.caloriesPer100 * factor),
      protein: Math.round(this.proteinPer100 * factor * 10) / 10,
      fat: Math.round(this.fatPer100 * factor * 10) / 10,
      carbs: Math.round(this.carbsPer100 * factor * 10) / 10,
    });
    this.router.navigateByUrl("/home");
  }
}

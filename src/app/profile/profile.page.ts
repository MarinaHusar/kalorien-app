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
import {
  ActivityLevel,
  Calculator,
  Goal,
  NutritionTargets,
} from "../services/calculator";

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
  private calculator = inject(Calculator);

  sex: "female" | "male" = "female";
  age = 30;
  heightCm = 168;
  weightKg = 60;
  activityLevel: ActivityLevel = "moderate";
  goal: Goal = "lose";

  get targets(): NutritionTargets {
    const bmr = this.calculator.calculateBmr(
      this.sex,
      this.age,
      this.heightCm,
      this.weightKg,
    );
    const tdee = this.calculator.calculateTdee(bmr, this.activityLevel);
    return this.calculator.calculateTargets(tdee, this.goal, this.weightKg);
  }
}

import { Injectable, inject } from "@angular/core";
import {
  ActivityLevel,
  Calculator,
  Goal,
  NutritionTargets,
} from "./calculator";

@Injectable({
  providedIn: "root",
})
export class UserProfile {
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

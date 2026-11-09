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

  constructor() {
    this.load();
  }

  save(): void {
    const data = {
      sex: this.sex,
      age: this.age,
      heightCm: this.heightCm,
      weightKg: this.weightKg,
      activityLevel: this.activityLevel,
      goal: this.goal,
    };
    localStorage.setItem("user-profile", JSON.stringify(data));
  }

  private load(): void {
    const saved = localStorage.getItem("user-profile");
    if (saved) {
      Object.assign(this, JSON.parse(saved));
    }
  }

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

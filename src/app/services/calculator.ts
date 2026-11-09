import { Injectable } from "@angular/core";
export type ActivityLevel = "low" | "moderate" | "high" | "veryHigh";
export type Goal = "lose" | "maintain" | "gain";

export interface NutritionTargets {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

@Injectable({
  providedIn: "root",
})
export class Calculator {
  calculateBmr(
    sex: "female" | "male",
    age: number,
    heightCm: number,
    weightKg: number,
  ): number {
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return sex === "male" ? base + 5 : base - 161;
  }
  calculateTdee(bmr: number, activityLevel: ActivityLevel): number {
    const factors = {
      low: 1.2,
      moderate: 1.55,
      high: 1.725,
      veryHigh: 1.9,
    };
    return Math.round(bmr * factors[activityLevel]);
  }
  calculateTargets(
    tdee: number,
    goal: Goal,
    weightKg: number,
  ): NutritionTargets {
    const goalFactors = { lose: 0.85, maintain: 1, gain: 1.1 };
    const calories = Math.round(tdee * goalFactors[goal]);
    const protein = Math.round(weightKg * 1.8);
    const fat = Math.round((calories * 0.28) / 9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
    return { calories, protein, fat, carbs };
  }
}

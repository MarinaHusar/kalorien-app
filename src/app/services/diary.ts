import { Injectable } from "@angular/core";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface FoodEntry {
  id: number;
  name: string;
  meal: MealType;
  grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

@Injectable({
  providedIn: "root",
})
export class Diary {
  entries: FoodEntry[] = [];
  private nextId = 1;

  addEntry(entry: Omit<FoodEntry, "id">): void {
    this.entries.push({ ...entry, id: this.nextId });
    this.nextId++;
  }

  removeEntry(id: number): void {
    this.entries = this.entries.filter((entry) => entry.id !== id);
  }

  getMealCalories(meal: MealType): number {
    let sum = 0;
    for (const entry of this.entries) {
      if (entry.meal === meal) {
        sum += entry.calories;
      }
    }
    return sum;
  }

  getTotals() {
    const totals = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    for (const entry of this.entries) {
      totals.calories += entry.calories;
      totals.protein += entry.protein;
      totals.fat += entry.fat;
      totals.carbs += entry.carbs;
    }
    return totals;
  }
}

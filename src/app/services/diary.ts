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

  constructor() {
    this.load();
  }

  private get storageKey(): string {
    return "diary-" + new Date().toLocaleDateString("sv-SE");
  }

  private load(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.entries = JSON.parse(saved);
      this.nextId = Math.max(0, ...this.entries.map((entry) => entry.id)) + 1;
    }
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
  }

  addEntry(entry: Omit<FoodEntry, "id">): void {
    this.entries.push({ ...entry, id: this.nextId });
    this.nextId++;
    this.save();
  }

  removeEntry(id: number): void {
    this.entries = this.entries.filter((entry) => entry.id !== id);
    this.save();
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

import { Injectable } from "@angular/core";

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
}

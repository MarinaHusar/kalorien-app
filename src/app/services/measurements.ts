import { Injectable } from "@angular/core";

export interface Measurement {
  date: string;
  weight: number;
  bodyFat: number;
  chest: number;
  waist: number;
  belly: number;
  hips: number;
  biceps: number;
}

export type MeasurementField = Exclude<keyof Measurement, "date">;

@Injectable({
  providedIn: "root",
})
export class Measurements {
  entries: Measurement[] = [];

  constructor() {
    this.load();
  }

  get latest(): Measurement | null {
    return this.entries.length > 0
      ? this.entries[this.entries.length - 1]
      : null;
  }

  get previous(): Measurement | null {
    return this.entries.length > 1
      ? this.entries[this.entries.length - 2]
      : null;
  }

  change(field: MeasurementField): number | null {
    if (!this.latest || !this.previous) {
      return null;
    }
    return Math.round((this.latest[field] - this.previous[field]) * 10) / 10;
  }

  add(values: Omit<Measurement, "date">): void {
    const date = new Date().toLocaleDateString("sv-SE");
    const entry: Measurement = { ...values, date };
    if (this.latest && this.latest.date === date) {
      this.entries[this.entries.length - 1] = entry;
    } else {
      this.entries.push(entry);
    }
    this.save();
  }

  private save(): void {
    localStorage.setItem("measurements", JSON.stringify(this.entries));
  }

  private load(): void {
    const saved = localStorage.getItem("measurements");
    if (saved) {
      this.entries = JSON.parse(saved);
    }
  }
}

import { Injectable, inject } from "@angular/core";
import { UserProfile } from "./user-profile";

@Injectable({
  providedIn: "root",
})
export class Water {
  private profile = inject(UserProfile);

  amountMl = 0;

  constructor() {
    this.load();
  }

  get goalMl(): number {
    return Math.round((this.profile.weightKg * 30) / 50) * 50;
  }

  add(ml: number): void {
    this.amountMl += ml;
    this.save();
  }

  undo(ml: number): void {
    this.amountMl = Math.max(this.amountMl - ml, 0);
    this.save();
  }

  private get storageKey(): string {
    return "water-" + new Date().toLocaleDateString("sv-SE");
  }

  private save(): void {
    localStorage.setItem(this.storageKey, String(this.amountMl));
  }

  private load(): void {
    const saved = localStorage.getItem(this.storageKey);
    this.amountMl = saved ? Number(saved) : 0;
  }
}

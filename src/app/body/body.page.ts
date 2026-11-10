import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/angular";
import { MeasurementField, Measurements } from "../services/measurements";
import { Calculator } from "../services/calculator";
import { UserProfile } from "../services/user-profile";

@Component({
  selector: "app-body",
  templateUrl: "./body.page.html",
  styleUrls: ["./body.page.scss"],
  imports: [
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  ],
})
export class BodyPage {
  measurements = inject(Measurements);
  private calculator = inject(Calculator);
  private profile = inject(UserProfile);

  circumferences: { field: MeasurementField; label: string }[] = [
    { field: "chest", label: "Brust" },
    { field: "waist", label: "Taille" },
    { field: "belly", label: "Bauch" },
    { field: "hips", label: "Hüfte" },
    { field: "biceps", label: "Bizeps" },
  ];

  form = {
    weight: this.measurements.latest?.weight ?? 0,
    bodyFat: this.measurements.latest?.bodyFat ?? 0,
    chest: this.measurements.latest?.chest ?? 0,
    waist: this.measurements.latest?.waist ?? 0,
    belly: this.measurements.latest?.belly ?? 0,
    hips: this.measurements.latest?.hips ?? 0,
    biceps: this.measurements.latest?.biceps ?? 0,
  };

  get estimatedBodyFat(): number {
    return this.calculator.estimateBodyFat(
      this.profile.sex,
      this.profile.age,
      this.profile.heightCm,
      this.form.weight,
    );
  }

  changeText(field: MeasurementField): string {
    const change = this.measurements.change(field);
    if (change === null) {
      return "";
    }
    if (change > 0) {
      return "+" + change;
    }
    if (change < 0) {
      return "−" + Math.abs(change);
    }
    return "0";
  }

  save(): void {
    this.measurements.add({ ...this.form, bodyFat: this.estimatedBodyFat });
  }
}

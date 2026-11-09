import { Component, inject } from "@angular/core";
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular";
import { Calculator } from "../services/calculator";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private calculator = inject(Calculator);

  constructor() {
    const bmr = this.calculator.calculateBmr("female", 30, 168, 60);
    console.log("BMR:", bmr);
  }
}

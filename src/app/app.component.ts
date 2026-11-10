import { Component } from "@angular/core";
import { IonApp, IonRouterOutlet } from "@ionic/angular";
import { BottomNav } from "./components/bottom-nav/bottom-nav.component";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  imports: [IonApp, IonRouterOutlet, BottomNav],
})
export class AppComponent {
  constructor() {}
}

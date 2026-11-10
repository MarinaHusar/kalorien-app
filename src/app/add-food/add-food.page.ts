import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/angular";
import { Diary, MealType } from "../services/diary";
import { Product, ProductSearch } from "../services/product-search";

@Component({
  selector: "app-add-food",
  templateUrl: "./add-food.page.html",
  styleUrls: ["./add-food.page.scss"],
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonBackButton,
    IonButtons,
  ],
})
export class AddFoodPage {
  private diary = inject(Diary);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productSearch = inject(ProductSearch);
  private cdr = inject(ChangeDetectorRef);

  name = "";
  meal: MealType = "lunch";
  grams = 100;
  caloriesPer100 = 0;
  proteinPer100 = 0;
  fatPer100 = 0;
  carbsPer100 = 0;

  searchQuery = "";
  results: Product[] = [];
  isSearching = false;
  searchDone = false;

  constructor() {
    const meal = this.route.snapshot.queryParamMap.get("meal");
    if (meal) {
      this.meal = meal as MealType;
    }
  }

  async search(): Promise<void> {
    if (!this.searchQuery.trim()) {
      return;
    }
    this.isSearching = true;
    this.searchDone = false;
    this.cdr.detectChanges();
    try {
      this.results = await this.productSearch.search(this.searchQuery);
    } catch {
      this.results = [];
    }
    this.isSearching = false;
    this.searchDone = true;
    this.cdr.detectChanges();
  }

  selectProduct(product: Product): void {
    this.name = product.name;
    this.caloriesPer100 = product.calories;
    this.proteinPer100 = product.protein;
    this.fatPer100 = product.fat;
    this.carbsPer100 = product.carbs;
    this.results = [];
    this.searchDone = false;
    this.cdr.detectChanges();
  }

  save(): void {
    const factor = this.grams / 100;
    this.diary.addEntry({
      name: this.name,
      meal: this.meal,
      grams: this.grams,
      calories: Math.round(this.caloriesPer100 * factor),
      protein: Math.round(this.proteinPer100 * factor * 10) / 10,
      fat: Math.round(this.fatPer100 * factor * 10) / 10,
      carbs: Math.round(this.carbsPer100 * factor * 10) / 10,
    });
    this.router.navigateByUrl("/home");
  }
}

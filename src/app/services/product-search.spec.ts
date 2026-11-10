import { Injectable } from "@angular/core";

export interface Product {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductSearch {
  async search(query: string): Promise<Product[]> {
    const url =
      "https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=15" +
      "&fields=product_name,nutriments&search_terms=" +
      encodeURIComponent(query);

    const response = await fetch(url);
    const data = await response.json();

    return (data.products ?? [])
      .filter(
        (p: any) =>
          p.product_name && p.nutriments?.["energy-kcal_100g"] != null,
      )
      .map((p: any) => ({
        name: p.product_name,
        calories: Math.round(p.nutriments["energy-kcal_100g"]),
        protein: Math.round((p.nutriments["proteins_100g"] ?? 0) * 10) / 10,
        fat: Math.round((p.nutriments["fat_100g"] ?? 0) * 10) / 10,
        carbs: Math.round((p.nutriments["carbohydrates_100g"] ?? 0) * 10) / 10,
      }));
  }
}

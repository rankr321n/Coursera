import { Component, OnInit } from "@angular/core";
import { Dish } from "../shared/dishes";
import { DISHES } from "../shared/dishes";
import { DishService } from "../services/dish.service";
import { flyInOut } from "../animation/app.animation";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;"
  },
  animations: [flyInOut()]
})
export class MenuComponent implements OnInit {
  dishes = DISHES;
  selectedDish = DISHES[0];
  errMess: string;
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
  constructor(private dishService: DishService) {}

  ngOnInit() {
    // this.dishService.getDishes().subscribe(dishes => (this.dishes = dishes));
    this.dishService.getDishes().subscribe(
      dishes => (this.dishes = dishes),
      errmess => (this.errMess = <any>errmess)
    );
  }
}

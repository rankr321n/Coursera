import { Component, OnInit, Input } from "@angular/core";
import { Dish } from "../shared/dishes";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";

import { visibility } from "../animation/app.animation";
@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.scss"],
  animations: [visibility()]
})
export class DishdetailComponent implements OnInit {
  visibility = "shown";
  dishIds: string[];
  prev: string;
  next: string;
  @Input()
  dish: Dish;
  dishcopy: Dish;
  errMess: String;
  comment: any;
  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // this.route.params
    //   .pipe(
    //     switchMap((params: Params) => this.dishService.getDish(params["id"]))
    //   )
    //   .subscribe(
    //     dish => {
    //       this.dish = dish;
    //       this.dishcopy = dish;
    //       this.setPrevNext(dish.id);
    //     },
    //     errmess => (this.errMess = <any>errmess)
    //   );
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = "hidden";
          return this.dishService.getDish(+params["id"]);
        })
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = "shown";
        },
        errmess => (this.errMess = <any>errmess)
      );
    // this.dishservice
    //   .getDishIds()
    //   .subscribe(dishIds => (this.dishIds = dishIds));
    // this.route.params
    //   .pipe(
    //     switchMap((params: Params) => this.dishservice.getDish(params["id"]))
    //   )
    //   .subscribe(dish => {
    //     this.dish = dish;
    //     this.setPrevNext(dish.id);
    //   });
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }
  OnSubmit() {
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(
      dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      errmess => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess;
      }
    );
  }
}

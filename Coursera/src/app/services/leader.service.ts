import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class LeaderService {
  constructor() {}
  getLeaders(): Leader[] {
    return LEADERS;
  }
}

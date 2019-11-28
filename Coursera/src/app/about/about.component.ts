import { Component, OnInit } from "@angular/core";
import { LeaderService } from "../services/leader.service";
import { Leader } from "../shared/leader";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  constructor(private lead: LeaderService) {}
  leader: Leader[];
  ngOnInit() {
    // this.leader=this.lead.getLeaders()
    this.lead.getAllLeaders().subscribe(data => {
      this.leader = data;
    });
  }
}

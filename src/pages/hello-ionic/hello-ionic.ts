import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { CardPage } from "../card/card";

@Component({
  selector: "page-hello-ionic",
  templateUrl: "hello-ionic.html"
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {}

  carddetails() {
    this.navCtrl.push(CardPage);
  }
}

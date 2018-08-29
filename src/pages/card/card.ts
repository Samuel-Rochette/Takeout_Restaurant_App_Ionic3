import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http, Headers } from "@angular/http";

import { Stripe } from "@ionic-native/stripe";

@IonicPage()
@Component({
  selector: "page-card",
  templateUrl: "card.html"
})
export class CardPage {
  cardinfo: any = {
    number: "",
    expMonth: "",
    expYear: "",
    cvc: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stripe: Stripe,
    public http: Http
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CardPage");
  }

  pay() {
    this.stripe.setPublishableKey("pk_test_aos8Hb9bRHO6zriz071XhMNv");
    this.stripe.createCardToken(this.cardinfo).then(token => {
      console.log(token.id);
      let data = {
        amount: "5000",
        stripetoken: token.id
      }
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      this.http
        .post("http://10.0.3.2:3333/processpay", JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          if (res.json().success) alert("transaction successful");
        });
    });
  }
}

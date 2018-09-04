import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { HomePage } from "../home/home";

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
  price: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public stripe: Stripe,
    private checkoutservice: CheckoutProvider
  ) {
    this.price = navParams.get("price");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CardPage");
  }

  pay() {
    this.stripe.setPublishableKey("pk_test_aos8Hb9bRHO6zriz071XhMNv");
    this.stripe.createCardToken(this.cardinfo).then(token => {
      console.log(token.id);
      let data = {
        amount: this.price,
        stripetoken: token.id
      };

      this.checkoutservice.postOrder(JSON.stringify(data)).subscribe(() => {
        this.checkoutservice.resetOrder();
        this.navCtrl.setRoot(HomePage);
      });
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { Item } from "../../shared/menuitem";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage implements OnInit {
  order: Item[];
  totalprice: number = 0;
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider
  ) {}

  ngOnInit() {
    this.checkoutservice
      .getOrder()
      .subscribe(
        order => (
          this.order = order,
          order.forEach((el) => {
            this.totalprice += el.price;
          })
        ),
        errmess => (this.errMess = errmess)
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CheckoutPage");
  }
}

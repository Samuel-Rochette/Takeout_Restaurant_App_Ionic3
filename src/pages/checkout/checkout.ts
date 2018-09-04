import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { Item } from "../../shared/menuitem";
import { CardPage } from "../card/card";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage implements OnInit {
  order: Item[];
  totalprice: number = 0;
  errMess: string;
  counter: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider
  ) {}

  ngOnInit() {
    this.counter = this.checkoutservice.returnOrder();
    this.checkoutservice.getOrder().subscribe(
      order => (
        (this.order = order),
        order.forEach(el => {
          el.amount = 0;
          this.counter.forEach(id => {
            if (id === el._id) {
              el.amount += 1;
            }
          });
          this.totalprice += el.price * el.amount;
        })
      ),
      errmess => (this.errMess = errmess)
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CheckoutPage");
  }

  carddetails() {
    this.navCtrl.push(CardPage, {
      price: this.totalprice
    });
  }
}

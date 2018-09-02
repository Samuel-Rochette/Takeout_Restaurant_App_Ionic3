import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { CheckoutProvider } from "../../providers/checkout/checkout";

@IonicPage()
@Component({
  selector: "page-itemdetail",
  templateUrl: "itemdetail.html"
})
export class ItemdetailPage implements OnInit {
  item: Item;
  amount: number;
  order: Array<any>;
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider
  ) {
    this.item = navParams.get("item");
  }

  ngOnInit() {
    this.order = this.checkoutservice.returnOrder();
    this.amount = 0;
    this.order.forEach(el => {
      if (el === this.item._id) {
        this.amount += 1;
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ItemdetailPage");
  }

  addToOrder() {
    this.checkoutservice.addToOrder(this.item._id);
    this.amount += 1;
  }
}

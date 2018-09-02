import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { CheckoutProvider } from "../../providers/checkout/checkout";

@IonicPage()
@Component({
  selector: "page-itemdetail",
  templateUrl: "itemdetail.html"
})
export class ItemdetailPage {
  item: Item;
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider
  ) {
    this.item = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ItemdetailPage");
  }

  addToOrder() {
    this.checkoutservice.addToOrder(this.item._id);
  }
}

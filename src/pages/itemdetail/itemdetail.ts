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
  order: Array<any>;
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider
  ) {
    this.item = navParams.get("item");
  }

  ngOnInit() {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ItemdetailPage");
  }

  addToOrder() {
    this.checkoutservice.addToOrder(this.item._id);
    this.item.amount += 1;
  }
}

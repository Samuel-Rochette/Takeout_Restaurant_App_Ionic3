import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { Storage } from "@ionic/storage";
import { CheckoutPage } from "../checkout/checkout";

@IonicPage()
@Component({
  selector: "page-itemdetail",
  templateUrl: "itemdetail.html"
})
export class ItemdetailPage implements OnInit {
  item: Item;
  order: Array<any>;
  savedOrders: Array<any>;
  saved: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider,
    private storage: Storage
  ) {
    this.item = navParams.get("item");
  }

  ngOnInit() {
    this.storage.get("savedOrders").then(val => {
      if (!val) {
        this.storage.set("savedOrders", []);
        this.savedOrders = [];
      } else {
        this.savedOrders = val;
        if (this.savedOrders.indexOf(this.item._id) != -1) {
          this.saved = true;
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ItemdetailPage");
  }

  addToOrder() {
    this.checkoutservice.addToOrder(this.item._id);
    this.item.amount += 1;
  }

  removeFromOrder() {
    this.checkoutservice.removeFromOrder(this.item._id);
    this.item.amount -= 1;
  }

  saveItem() {
    this.savedOrders.push(this.item._id);
    this.storage.set("savedOrders", this.savedOrders);
    this.saved = true;
  }

  unSaveItem() {
    let index = this.savedOrders.indexOf(this.item._id);
    this.savedOrders.splice(index, 1);
    this.storage.set("savedOrders", this.savedOrders);
    this.saved = false;
  }

  moveToCheckout() {
    this.navCtrl.setRoot(CheckoutPage);
  }
}

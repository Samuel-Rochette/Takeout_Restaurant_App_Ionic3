import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { MenuProvider } from "../../providers/menu/menu";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { Storage } from "@ionic/storage";
import { CardFormPage } from "../card-form/card-form";
import { MenuPage } from "../menu/menu";

@IonicPage()
@Component({
  selector: "page-itemdetail",
  templateUrl: "itemdetail.html"
})
export class ItemdetailPage implements OnInit {
  item: Item;
  prevItem: Item;
  nextItem: Item;
  counter: Array<any>;
  order: Array<any>;
  savedOrders: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider,
    private menuservice: MenuProvider,
    private storage: Storage
  ) {
    this.item = navParams.get("item");
  }

  ngOnInit() {
    this.menuservice.getMenu().subscribe(items => {
      for (var i = 0; i < items.length; i++) {
        if (items[i]._id === this.item._id) {
          this.prevItem = items[(items.length + i - 1) % items.length];
          this.nextItem = items[(items.length + i + 1) % items.length];
        }
      }
    });

    this.counter = this.checkoutservice.returnOrder();
    this.item.amount = 0;
    this.counter.forEach(id => {
      if (id === this.item._id) {
        this.item.amount += 1;
      }
    });

    this.storage.get("savedOrders").then(val => {
      if (!val) {
        this.storage.set("savedOrders", []);
        this.savedOrders = [];
      } else {
        this.savedOrders = val;
        if (this.savedOrders.indexOf(this.item._id) != -1) {
          this.item.saved = true;
        } else {
          this.item.saved = false;
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
    this.item.saved = true;
  }

  unSaveItem() {
    let index = this.savedOrders.indexOf(this.item._id);
    this.savedOrders.splice(index, 1);
    this.storage.set("savedOrders", this.savedOrders);
    this.item.saved = false;
  }

  moveToCheckout() {
    this.navCtrl.setRoot(CardFormPage);
  }

  next() {
    this.navCtrl
      .push(
        ItemdetailPage,
        {
          item: this.nextItem
        },
        {
          animation: "ios-transition"
        }
      )
      .then(() => {
        this.navCtrl.remove(1);
      });
  }

  prev() {
    this.navCtrl
      .push(
        ItemdetailPage,
        {
          item: this.prevItem
        },
        {
          animation: "ios-transition"
        }
      )
      .then(() => {
        this.navCtrl.remove(1);
      });
  }

  swipeEvent(event) {
    if (event.direction == 2) {
      this.next();
    }
    if (event.direction == 4) {
      this.prev();
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { MenuProvider } from "../../providers/menu/menu";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { ItemdetailPage } from "../itemdetail/itemdetail";
import { CardFormPage } from "../card-form/card-form";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage implements OnInit {
  items: Item[];
  errMess: string;
  counter: Array<any>;
  searchOpen: boolean = false;
  searchBar: string = "";
  savedOrders: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuservice: MenuProvider,
    private checkoutservice: CheckoutProvider,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.counter = this.checkoutservice.returnOrder();
    this.storage.get("savedOrders").then(val => {
      this.menuservice.getMenu().subscribe(
        items => (
          (this.items = items),
          items.forEach(el => {
            el.amount = 0;
            this.counter.forEach(id => {
              if (id === el._id) {
                el.amount += 1;
              }
            });
            if (!val) {
              this.storage.set("savedOrders", []);
              this.savedOrders = [];
            } else {
              this.savedOrders = val;
              if (this.savedOrders.indexOf(el._id) != -1) {
                el.saved = true;
              } else {
                el.saved = false;
              }
            }
          })
        ),
        errmess => (this.errMess = errmess.message)
      );
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  addToOrder(event, item) {
    event.stopPropagation();
    this.checkoutservice.addToOrder(item._id);
    item.amount += 1;
  }

  removeFromOrder(event, item) {
    event.stopPropagation();
    this.checkoutservice.removeFromOrder(item._id);
    item.amount -= 1;
  }

  itemSelected(event, item) {
    this.navCtrl.push(ItemdetailPage, {
      item: item
    });
  }

  moveToCheckout() {
    this.navCtrl.setRoot(CardFormPage);
  }

  saveItem(event, item) {
    this.savedOrders.push(item._id);
    this.storage.set("savedOrders", this.savedOrders);
    item.saved = true;
  }

  unSaveItem(event, item) {
    let index = this.savedOrders.indexOf(item._id);
    this.savedOrders.splice(index, 1);
    this.storage.set("savedOrders", this.savedOrders);
    item.saved = false;
  }

  onInput(event) {
    this.items = [];
    this.menuservice.getMenu().subscribe(items => {
      items.forEach(item => {
        if (
          item.name.toUpperCase().indexOf(this.searchBar.toUpperCase()) != -1
        ) {
          this.items.push(item);
        }
      }),
        items.forEach(el => {
          el.amount = 0;
          this.counter.forEach(id => {
            if (id === el._id) {
              el.amount += 1;
            }
          });
        });
    });
  }
}

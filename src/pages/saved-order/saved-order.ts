import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { MenuProvider } from "../../providers/menu/menu";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { ItemdetailPage } from "../itemdetail/itemdetail";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-saved-order",
  templateUrl: "saved-order.html"
})
export class SavedOrderPage implements OnInit {
  items: Item[];
  errMess: string;
  counter: Array<any>;
  searchOpen: boolean = false;
  searchBar: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuservice: MenuProvider,
    private checkoutservice: CheckoutProvider,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("savedOrders").then(val => {
      this.counter = this.checkoutservice.returnOrder();
      this.menuservice.getMenu().subscribe(
        items => (
          (this.items = []),
          items.forEach(el => {
            el.amount = 0;
            this.counter.forEach(id => {
              if (id === el._id) {
                el.amount += 1;
              }
            });
            if (val.indexOf(el._id) != -1) {
              this.items.push(el);
            }
          })
        ),
        errmess => (this.errMess = errmess)
      );
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SavedOrderPage");
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

  onInput(event) {
    this.storage.get("savedOrders").then(val => {
      this.items = [];
      this.menuservice.getMenu().subscribe(items => {
        items.forEach(item => {
          if (
            item.name.toUpperCase().indexOf(this.searchBar.toUpperCase()) !=
              -1 &&
            val.indexOf(item._id) != -1
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
    });
  }
}
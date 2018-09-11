import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { MenuProvider } from "../../providers/menu/menu";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { ItemdetailPage } from "../itemdetail/itemdetail";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuservice: MenuProvider,
    private checkoutservice: CheckoutProvider
  ) {}

  ngOnInit() {
    this.counter = this.checkoutservice.returnOrder();
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
        })
      ),
      errmess => (this.errMess = errmess.message)
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");
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

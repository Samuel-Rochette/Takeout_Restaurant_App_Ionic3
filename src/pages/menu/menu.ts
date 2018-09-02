import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Item } from "../../shared/menuitem";
import { MenuProvider } from "../../providers/menu/menu";
import { ItemdetailPage } from "../itemdetail/itemdetail";

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage implements OnInit {
  items: Item[];
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuservice: MenuProvider
  ) {}

  ngOnInit() {
    this.menuservice
      .getMenu()
      .subscribe(
        items => (this.items = items),
        errmess => (this.errMess = <string>errmess)
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuPage");
  }

  itemSelected(event, item) {
    this.navCtrl.push(ItemdetailPage, {
      item: item
    });
  }
}

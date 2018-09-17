import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import { SavedOrderPage } from "../saved-order/saved-order";
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }

  moveToMenu() {
    this.navCtrl.setRoot(MenuPage);
  }

  moveToSaved() {
    this.navCtrl.setRoot(SavedOrderPage);
  }

  onCall() {
    this.callNumber.callNumber("85212345678", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}

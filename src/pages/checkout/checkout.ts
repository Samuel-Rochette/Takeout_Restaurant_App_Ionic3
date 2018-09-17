import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { Item } from "../../shared/menuitem";
import { Stripe } from "@ionic-native/stripe";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage implements OnInit {
  order: Item[];
  totalprice: number = 0;
  hst: number = 0;
  stripeFee: number = 0;
  displayprice: string;
  errMess: string;
  counter: Array<any>;
  email: string;
  isDelivery: boolean;
  cardInfo: any = {
    number: "",
    expMonth: "",
    expYear: "",
    cvc: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private checkoutservice: CheckoutProvider,
    private stripe: Stripe,
    private alertCtrl: AlertController
  ) {
    this.isDelivery = this.navParams.get("isDelivery");
    this.email = this.navParams.get("email");
    this.cardInfo.number = this.navParams.get("cardNumber");
    this.cardInfo.expMonth = this.navParams.get("expMonth");
    this.cardInfo.expYear = this.navParams.get("expYear");
    this.cardInfo.cvc = this.navParams.get("cvv");
  }

  ngOnInit() {
    if (this.isDelivery) {
      this.totalprice += 2;
    }
    this.counter = this.checkoutservice.returnOrder();
    this.checkoutservice.getOrder().subscribe(
      order => (
        (this.order = order),
        order.forEach(el => {
          el.amount = 0;
          this.counter.forEach(id => {
            if (id === el._id) {
              el.amount += 1;
            }
          });
          this.totalprice += parseFloat(el.price) * el.amount;
        }),
        (this.hst = parseFloat((this.totalprice * 0.13).toFixed(2))),
        (this.totalprice += this.hst),
        (this.stripeFee = parseFloat(
          (this.totalprice * 0.03 + 0.31).toFixed(2)
        )),
        (this.totalprice += this.stripeFee),
        (this.displayprice = (Math.round(this.totalprice * 100) / 100)
          .toFixed(2)
          .toString())
      ),
      errmess => (this.errMess = errmess)
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CheckoutPage");
  }

  pay() {
    this.stripe.setPublishableKey("pk_test_aos8Hb9bRHO6zriz071XhMNv");
    this.stripe
      .createCardToken(this.cardInfo)
      .then(token => {
        let data = {
          amount: parseFloat((this.totalprice * 100).toFixed(0)),
          stripetoken: token.id,
          email: this.email
        };

        this.checkoutservice.postOrder(JSON.stringify(data)).subscribe({
          next: response => {
            if (response.message == "success") {
              this.checkoutservice.resetOrder();
              let alert = this.alertCtrl.create({
                title: "Success",
                subTitle: "Transaction was successful",
                enableBackdropDismiss: false,
                buttons: [
                  {
                    text: "OK",
                    handler: () => {
                      this.navCtrl.setRoot(HomePage);
                    }
                  }
                ]
              });
              alert.present();
            }
          },
          error: err => console.log(err.message)
        });
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      });
  }
}

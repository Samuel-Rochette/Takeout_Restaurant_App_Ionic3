import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CheckoutPage } from "../checkout/checkout";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { MenuPage } from "../menu/menu";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-card-form",
  templateUrl: "card-form.html"
})
export class CardFormPage implements OnInit {
  order: Array<any>;
  email: string = "";
  cardNumber: string = "";
  address: string = "";
  expMonth: string = "";
  expYear: string = "";
  cvv: string = "";
  cardForm: FormGroup;
  saveEmail: boolean = false;
  saveAddress: boolean = false;
  saveCardInfo: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private checkoutservice: CheckoutProvider,
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.order = this.checkoutservice.returnOrder();
    this.storage.get("email").then(val => {
      if (val) {
        this.email = val;
      }
    });
    this.storage.get("address").then(val => {
      if (val) {
        this.address = val;
      }
    });
    this.storage.get("cardInfo").then(val => {
      if (val) {
        this.cardNumber = val.cardNumber;
        this.expMonth = val.expMonth;
        this.expYear = val.expYear;
        this.cvv = val.cvv;
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CardFormPage");
  }

  createForm() {
    this.cardForm = this.fb.group({
      cardNumber: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(12),
          Validators.maxLength(19)
        ]
      ],
      expMonth: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(2)
        ]
      ],
      expYear: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(2),
          Validators.maxLength(2)
        ]
      ],
      cvv: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(3),
          Validators.maxLength(4)
        ]
      ],
      email: ["", [Validators.required, Validators.email]],
      isDelivery: false,
      address: ""
    });
  }

  backToMenu() {
    this.navCtrl.setRoot(MenuPage);
  }

  presentOptions() {
    let options = this.alertCtrl.create();
    options.setTitle("Options");

    options.addInput({
      type: "checkbox",
      label: "Save Email",
      value: "saveEmail",
      checked: this.saveEmail
    });

    options.addInput({
      type: "checkbox",
      label: "Save Address",
      value: "saveAddress",
      checked: this.saveAddress
    });

    options.addInput({
      type: "checkbox",
      label: "Save Card Information",
      value: "saveCardInfo",
      checked: this.saveCardInfo
    });

    options.addButton("Cancel");
    options.addButton({
      text: "Okay",
      handler: data => {
        if (data.indexOf("saveEmail") != -1) {
          this.saveEmail = true;
        }
        if (data.indexOf("saveAddress") != -1) {
          this.saveAddress = true;
        }
        if (data.indexOf("saveCardInfo") != -1) {
          this.saveCardInfo = true;
        }
      }
    });
    options.present();
  }

  onSubmit() {
    let data = {
      isDelivery: this.cardForm.value.isDelivery,
      address: this.cardForm.value.address
    };
    this.checkoutservice.checkInfo(JSON.stringify(data)).subscribe(response => {
      if (response.message === "success") {
        if (this.saveEmail) {
          this.storage.set("email", this.cardForm.value.email);
        }
        if (this.saveAddress) {
          this.storage.set("address", this.cardForm.value.address);
        }
        if (this.saveCardInfo) {
          this.storage.set("cardInfo", {
            cardNumber: this.cardForm.value.cardNumber,
            expMonth: this.cardForm.value.expMonth,
            expYear: this.cardForm.value.expYear,
            cvv: this.cardForm.value.cvv
          });
        }
        this.navCtrl.push(CheckoutPage, {
          email: this.cardForm.value.email,
          isDelivery: this.cardForm.value.isDelivery,
          cardNumber: this.cardForm.value.cardNumber,
          expMonth: this.cardForm.value.expMonth,
          expYear: this.cardForm.value.expYear,
          cvv: this.cardForm.value.cvv
        });
      } else {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: response.message,
          buttons: ["OK"]
        });
        alert.present();
      }
    });
  }
}

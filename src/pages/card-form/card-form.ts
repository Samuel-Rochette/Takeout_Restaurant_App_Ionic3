import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CheckoutPage } from "../checkout/checkout";
import { CheckoutProvider } from "../../providers/checkout/checkout";
import { MenuPage } from "../menu/menu";

@IonicPage()
@Component({
  selector: "page-card-form",
  templateUrl: "card-form.html"
})
export class CardFormPage implements OnInit {
  order: Array<any>;
  cardForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private checkoutservice: CheckoutProvider
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.order = this.checkoutservice.returnOrder();
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
  onSubmit() {
    this.navCtrl.push(CheckoutPage, {
      cardNumber: this.cardForm.value.cardNumber,
      expMonth: this.cardForm.value.expMonth,
      expYear: this.cardForm.value.expYear,
      cvv: this.cardForm.value.cvv,
      email: this.cardForm.value.email,
      isDelivery: this.cardForm.value.isDelivery,
      address: this.cardForm.value.address
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { Stripe } from "@ionic-native/stripe";
import { IonicStorageModule } from "@ionic/storage";

import { HomePage } from "../pages/home/home";
import { CardPage } from "../pages/card/card";
import { MenuPage } from "../pages/menu/menu";
import { ItemdetailPage } from "../pages/itemdetail/itemdetail";
import { CheckoutPage } from "../pages/checkout/checkout";
import { SavedOrderPage} from "../pages/saved-order/saved-order"
import { CardFormPage } from "../pages/card-form/card-form";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuProvider } from '../providers/menu/menu';
import { CheckoutProvider } from '../providers/checkout/checkout';

@NgModule({
  declarations: [
    MyApp,
    CardPage,
    HomePage,
    MenuPage,
    ItemdetailPage,
    CheckoutPage,
    SavedOrderPage,
    CardFormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardPage,
    HomePage,
    MenuPage,
    ItemdetailPage,
    CheckoutPage,
    SavedOrderPage,
    CardFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuProvider,
    CheckoutProvider
  ]
})
export class AppModule {}

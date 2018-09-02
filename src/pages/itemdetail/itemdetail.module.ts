import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemdetailPage } from './itemdetail';

@NgModule({
  declarations: [
    ItemdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemdetailPage),
  ],
})
export class ItemdetailPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedOrderPage } from './saved-order';

@NgModule({
  declarations: [
    SavedOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedOrderPage),
  ],
})
export class SavedOrderPageModule {}

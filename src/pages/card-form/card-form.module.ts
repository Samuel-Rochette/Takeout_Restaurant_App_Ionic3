import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardFormPage } from './card-form';

@NgModule({
  declarations: [
    CardFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CardFormPage),
  ],
})
export class CardFormPageModule {}

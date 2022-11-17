import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancleOrderPage } from './cancle-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [CancleOrderPage],
  entryComponents: [CancleOrderPage]
})
export class CancleOrderPageModule {}

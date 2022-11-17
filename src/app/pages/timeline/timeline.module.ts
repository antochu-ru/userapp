import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
import { IonicModule } from "@ionic/angular";

import { TimelinePage } from "./timeline.page";

// import { CancleOrderPageModule } from '../cancbble-order/cancle-order.module';

const routes: Routes = [
  {
    path: "",
    component: TimelinePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: ""
    }),
    AgmDirectionModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimelinePage]
})
export class TimelinePageModule {}

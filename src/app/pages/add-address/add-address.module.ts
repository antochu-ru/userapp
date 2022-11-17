import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AgmCoreModule } from "@agm/core";
import { IonicModule } from "@ionic/angular";
import { AgmDirectionModule } from "agm-direction";
import { AddAddressPage } from "./add-address.page";

const routes: Routes = [
  {
    path: "",
    component: AddAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: ""
    }),
    AgmDirectionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddAddressPage]
})
export class AddAddressPageModule {}

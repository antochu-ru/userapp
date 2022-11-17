import { AddAddressPageModule } from "./pages/add-address/add-address.module";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SuccessModalPageModule } from "./pages/success-modal/success-modal.module";
import { FilterPageModule } from "./pages/filter/filter.module";
import { PopoverPageModule } from "./pages/popover/popover.module";
import { CancleOrderPageModule } from "./pages/cancle-order/cancle-order.module";
import { HttpClientModule } from "@angular/common/http";
import { Camera } from "@ionic-native/camera/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { PayPal } from "@ionic-native/paypal/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SuccessModalPageModule,
    FilterPageModule,
    PopoverPageModule,
    CancleOrderPageModule,
    HttpClientModule,
    AddAddressPageModule
  ],
  providers: [
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    Camera,
    NativeGeocoder,
    SocialSharing,
    PayPal,
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

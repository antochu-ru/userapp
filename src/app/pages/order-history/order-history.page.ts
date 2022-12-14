import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-order-history",
  templateUrl: "./order-history.page.html",
  styleUrls: ["./order-history.page.scss"]
})
export class OrderHistoryPage implements OnInit {
  data: any = {};
  currency: any;
  constructor(
    private ntrl: NavController,
    private api: ApiService,
    private alertController: AlertController,
    private util: UtilService
  ) {
  }

  ionViewWillEnter() {
    this.currency = this.api.currency;
    this.util.startLoad();
    this.api.getDataWithToken("userOrder").subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        this.util.dismissLoader();
      }
    });
  }

  ngOnInit() {}

  back() {
    this.ntrl.back();
  }

  orderDetail(id) {
    this.api.orderID = id;
    this.ntrl.navigateForward(["order-detail"]);
  }

  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: "Cancel Order",
      message: "Do you want to Cancel this order",
      buttons: [
        {
          text: "Yes",
          role: "yes",
          cssClass: "secondary",
          handler: () => {
            this.util.startLoad();
            this.api.getDataWithToken("cancelOrder/" + id).subscribe(
              (res: any) => {
                if (res.success) {
                  this.util.presentToast(res.msg);
                  this.api.getDataWithToken("userOrder").subscribe(
                    (res: any) => {
                      if (res.success) {
                        this.data = res.data;
                        this.util.dismissLoader();
                      }
                    },
                    err => {
                      this.util.dismissLoader();
                    }
                  );
                }
              },
              err => {
                this.util.dismissLoader();
              }
            );
          }
        },
        {
          text: "No",
          role: "no",
          cssClass: "secondary",
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }
}

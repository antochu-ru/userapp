import { FilterPage } from './../app/pages/filter/filter.page';
import { UtilService } from './../app/service/util.service';
import { ApiService } from './../app/service/api.service';
import { Component } from "@angular/core";
import * as moment from "moment";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder/ngx";

import {
  ModalController,
  NavController,
  MenuController
} from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  term:string;
  userAddress: any = {};
  err: any = {};
  currentTime: any;
  staticData: any = {
    feature: [
      {
        image: "assets/image/diamond.svg",
        text: "Most Popular",
        type: "popular"
      },
      {
        image: "assets/image/near.svg",
        text: "Great Offers"
      },
      {
        image: "assets/image/express.svg",
        text: "Pure Veg Places",
        type: "pureveg"
      },
      {
        image: "assets/image/pocket.svg",
        text: "Pocket Friendly",
        type: "lowcost"
      },
      {
        image: "assets/image/shop.svg",
        text: "Nearest Me",
        type: "nearest"
      }
    ]
  };
  data: any = {};
  btnType = "Exclusive";
  currency: any;
  Address: any;
  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    private ntrl: NavController,
    private nativeGeocoder: NativeGeocoder,
    private api: ApiService,
    private util: UtilService,
    private geolocation: Geolocation
  ) {
    this.menu.enable(true);
    
    this.util.startLoad();
    this.api.getDataWithToken("home").subscribe(
      (res: any) => {
        if (res.success) {
          this.data = res.data;
          this.currency = this.api.currency;
          this.util.dismissLoader();
        }
      },
      err => {
        this.util.dismissLoader();
        this.err = err;
      }
    );
  }

  ionViewWillEnter() {
    if (localStorage.getItem("isaddress") != "false") {
      this.util.startLoad();
      this.api
        .getDataWithToken("getAddress/" + localStorage.getItem("isaddress"))
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.userAddress = res.data;
              this.util.dismissLoader();
            }
          },
          err => {
            this.err = err;
            this.util.dismissLoader();
          }
        );
    } else {
      this.util.startLoad();
      this.geolocation
        .getCurrentPosition()
        .then(resp => {
          resp.coords.latitude;
          resp.coords.longitude;
          let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
          };
          this.nativeGeocoder
            .reverseGeocode(
              resp.coords.latitude,
              resp.coords.longitude,
              options
            )
            .then((result: NativeGeocoderResult[]) => {
              this.util.dismissLoader();
              this.userAddress.address_type = "Current Location";
              this.userAddress.soc_name = result[0].subLocality;
              this.userAddress.street = result[0].thoroughfare;
              this.userAddress.city = result[0].locality;
              this.userAddress.zipcode = result[0].postalCode;
            })
            .catch((error: any) => console.log(error));
        })
        .catch(error => {
          this.util.dismissLoader();
        });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: "filterModal",
      backdropDismiss: true
    });
    modal.onDidDismiss().then(data => {
      if (data["data"] != undefined) {
        let filtertype;
        data.data.forEach(element => {
          if (element.checked == true) {
            filtertype = element.name;
          }
        });

        if (filtertype == "Cost High to Low") {
          this.data.shop.sort((a, b) => {
            if (a.avarage_plate_price > b.avarage_plate_price) {
              return -1;
            }
            if (a.avarage_plate_price < b.avarage_plate_price) {
              return 1;
            }
            return 0;
          });
        }
        if (filtertype == "Top Rated" || filtertype == "Most Popular") {
          this.data.shop.sort((a, b) => {
            if (a.rate > b.rate) {
              return -1;
            }
            if (a.rate < b.rate) {
              return 1;
            }
            return 0;
          });
        }
        if (filtertype == "Cost Low to High") {
          this.data.shop.sort((a, b) => {
            if (a.avarage_plate_price < b.avarage_plate_price) {
              return -1;
            }
            if (a.avarage_plate_price > b.avarage_plate_price) {
              return 1;
            }
            return 0;
          });
        }
        if (filtertype == "Open Now") {
          this.currentTime = moment().format("HH:mm");
          this.data.shop = this.data.shop.filter(a => {
            a.open_time = moment("2019-07-19 " + a.open_time).format("HH:mm");
            a.close_time = moment("2019-07-19 " + a.close_time).format("HH:mm");

            if (
              this.currentTime >= a.open_time &&
              this.currentTime <= a.close_time
            ) {
              return a;
            }
          });
        }
        if (filtertype == "Nearest Me") {
          if (localStorage.getItem("isaddress") != "false") {
            this.api
              .getDataWithToken(
                "getAddress/" + localStorage.getItem("isaddress")
              )
              .subscribe((res: any) => {
                if (res.success) {
                  this.Address =
                    res.data.soc_name +
                    " " +
                    res.data.street +
                    " " +
                    res.data.city +
                    " " +
                    res.data.zipcode;

                  let options: NativeGeocoderOptions = {
                    useLocale: true,
                    maxResults: 5
                  };

                  this.nativeGeocoder
                    .forwardGeocode(this.Address, options)
                    .then((result: NativeGeocoderResult[]) => {
                      this.data.shop.forEach(element => {
                        element.distance = this.distance(
                          result[0].latitude,
                          result[0].longitude,
                          element.latitude,
                          element.longitude,
                          "K"
                        );
                      });

                      this.data.shop.sort((a, b) => {
                        if (a.distance < b.distance) {
                          return -1;
                        }
                        if (a.distance > b.distance) {
                          return 1;
                        }
                      });
                    })
                    .catch((error: any) => console.log(error));
                }
              });
          } else {
            let options: NativeGeocoderOptions = {
              useLocale: true,
              maxResults: 5
            };

            this.nativeGeocoder
              .forwardGeocode(this.userAddress, options)
              .then((result: NativeGeocoderResult[]) => {
                this.data.shop.forEach(element => {
                  element.distance = this.distance(
                    result[0].latitude,
                    result[0].longitude,
                    element.latitude,
                    element.longitude,
                    "K"
                  );
                });

                this.data.shop.sort((a, b) => {
                  if (a.distance < b.distance) {
                    return -1;
                  }
                  if (a.distance > b.distance) {
                    return 1;
                  }
                });
              })
              .catch((error: any) => console.log(error));
          }
        }
      }
    });
    return await modal.present();
  }

  detail() {
    this.ntrl.navigateForward(["restaurant-detail"]);
  }

  resturantDetail(id) {
    this.api.detailId = id;
    this.ntrl.navigateForward(["restaurant-detail"]);
  }
  
  distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  feature(type) {
    if (type) {
      this.api.filterType = type;
      this.ntrl.navigateForward("/category");
    } else {
      this.ntrl.navigateForward("/promocode/menu");
    }
  } 

  categoryData(id) {
    this.ntrl.navigateForward("/category/" + id);
  }
}

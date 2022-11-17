import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user: any = {
    provider: "LOCAL"
  };
  err: any = {};
  public remember: boolean = false;
  public showPassword: boolean = false;
  constructor(
    private menu: MenuController,
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.user.email = "user-foodlands@saasmonks.in";
    this.user.password = "123456";
    this.menu.enable(false);
    if (localStorage.getItem("remember")) {
      this.user = JSON.parse(localStorage.getItem("remember"));
      this.user.provider = "LOCAL";
      this.remember = true;
    }
  }

  ngOnInit() {}
  signup() {
    this.ntrl.navigateForward(["signup"]);
  }
  gotoSlide() {
    this.user.device_token = this.api.deviceToken;
    this.util.startLoad();
    this.api.postData("login", this.user).subscribe(
      (res: any) => {
        if (res.success) {
           // for remember me
           if (this.remember) {
            let temp: any = {
              email: this.user.email,
              password: this.user.password,
            };
            localStorage.setItem("remember", JSON.stringify(temp));
          } else {
            localStorage.removeItem("remember");
          }
          this.err = {};
          localStorage.setItem("token", res.data.token);
          this.api.userToken = res.data.token;
          this.util.isUpdateProfile.next(true);
          this.util.presentToast("You are successfully logged in");
          if (res.data.address_id) {
            localStorage.setItem("isaddress", res.data.address_id);
          } else {
            localStorage.setItem("isaddress", "false");
          }
          this.ntrl.navigateRoot("/home");
        } else {
          this.api.verifyId = res.data.id;
          this.ntrl.navigateForward("verify");
        }
        this.util.dismissLoader();
      },
      err => {
        if (err.error.msg) {
          this.util.presentToast(err.error.msg);
        }
        this.err = err.error.errors;
        this.util.dismissLoader();
      }
    );
  } 
  forgotPassword() {
    this.ntrl.navigateForward(["forgot"]);
  }
  rememberToggle(ev: any) {
    ev.stopPropagation();
    this.remember = !this.remember;
  }
}

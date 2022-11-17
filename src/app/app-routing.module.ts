import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "list",
    loadChildren: () => import("./list/list.module").then(m => m.ListPageModule)
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule"
  },
  {
    path: "verify",
    loadChildren: "./pages/verify/verify.module#VerifyPageModule"
  },
  {
    path: "get-otp",
    loadChildren: "./pages/get-otp/get-otp.module#GetOtpPageModule"
  },
  { path: "slide", loadChildren: "./pages/slide/slide.module#SlidePageModule" },
  { path: "cart", loadChildren: "./pages/cart/cart.module#CartPageModule" },
  {
    path: "payment-method",
    loadChildren:
      "./pages/payment-method/payment-method.module#PaymentMethodPageModule"
  },
  {
    path: "add-card",
    loadChildren: "./pages/add-card/add-card.module#AddCardPageModule"
  },
  {
    path: "success-modal",
    loadChildren:
      "./pages/success-modal/success-modal.module#SuccessModalPageModule"
  },
  {
    path: "payment",
    loadChildren: "./pages/payment/payment.module#PaymentPageModule"
  },
  {
    path: "order-history",
    loadChildren:
      "./pages/order-history/order-history.module#OrderHistoryPageModule"
  },
  {
    path: "order-detail",
    loadChildren:
      "./pages/order-detail/order-detail.module#OrderDetailPageModule"
  },
  {
    path: "restaurant-detail",
    loadChildren:
      "./pages/restaurant-detail/restaurant-detail.module#RestaurantDetailPageModule"
  },
  {
    path: "promocode/:id",
    loadChildren: "./pages/promocode/promocode.module#PromocodePageModule"
  },
  {
    path: "notification",
    loadChildren:
      "./pages/notification/notification.module#NotificationPageModule"
  },
  {
    path: "invite-friends",
    loadChildren:
      "./pages/invite-friends/invite-friends.module#InviteFriendsPageModule"
  },
  {
    path: "help-center",
    loadChildren: "./pages/help-center/help-center.module#HelpCenterPageModule"
  },
  {
    path: "filter",
    loadChildren: "./pages/filter/filter.module#FilterPageModule"
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule"
  },
  {
    path: "profile/:id",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule"
  },
  {
    path: "timeline",
    loadChildren: "./pages/timeline/timeline.module#TimelinePageModule"
  },
  {
    path: "popover",
    loadChildren: "./pages/popover/popover.module#PopoverPageModule"
  },
  {
    path: "review",
    loadChildren: "./pages/review/review.module#ReviewPageModule"
  },
  {
    path: "forgot",
    loadChildren: "./pages/forgot/forgot.module#ForgotPageModule"
  },
  {
    path: "item-review",
    loadChildren: "./pages/item-review/item-review.module#ItemReviewPageModule"
  },
  {
    path: "add-address",
    loadChildren: "./pages/add-address/add-address.module#AddAddressPageModule"
  },
  {
    path: "select-address",
    loadChildren:
      "./pages/select-address/select-address.module#SelectAddressPageModule"
  },
  {
    path: "category/:id",
    loadChildren: "./pages/category/category.module#CategoryPageModule"
  },
  {
    path: "category",
    loadChildren: "./pages/category/category.module#CategoryPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

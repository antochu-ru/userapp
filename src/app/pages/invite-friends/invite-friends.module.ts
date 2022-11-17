import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InviteFriendsPage } from './invite-friends.page';

const routes: Routes = [
  {
    path: '',
    component: InviteFriendsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InviteFriendsPage]
})
export class InviteFriendsPageModule {}

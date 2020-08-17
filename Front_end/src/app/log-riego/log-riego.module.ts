import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogRiegoPageRoutingModule } from './log-riego-routing.module';

import { LogRiegoPage } from './log-riego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogRiegoPageRoutingModule
  ],
  declarations: [LogRiegoPage]
})
export class LogRiegoPageModule {}

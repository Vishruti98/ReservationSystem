import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SeatReservationComponent } from './seat-reservation.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, SeatReservationComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

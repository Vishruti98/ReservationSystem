import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.scss'],
})
export class SeatReservationComponent {
  numSeats: number;
  seats: any[][];

  constructor() {
    this.numSeats = 0;
    this.seats = this.generateSeats();
  }

  generateSeats() {
    const rows = Math.floor(80 / 7); // Number of rows with 7 seats
    const lastRowSeats = 80 % 7; // Number of seats in the last row

    const seats = [];
    let seatNumber = 1;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        row.push({ name: seatNumber++, reserved: false });
      }
      seats.push(row);
    }

    if (lastRowSeats > 0) {
      const lastRow = [];
      for (let i = 0; i < lastRowSeats; i++) {
        lastRow.push({ name: seatNumber++, reserved: false });
      }
      seats.push(lastRow);
    }
    console.log(seats);
    return seats;
  }

  markSeatsAsReserved(row: any[], startIndex: number, numSeats: number) {
    for (let i = startIndex; i < startIndex + numSeats; i++) {
      row[i].reserved = true;
    }
  }

  reserveSeats() {
    let seatsToReserve = this.numSeats;
    let seatsReserved = 0;
    let prioritySeatsFound = false;

    for (let i = 0; i < this.seats.length; i++) {
      const row = this.seats[i];
      const startIndex = this.findAvailableSeats(row, prioritySeatsFound);

      if (startIndex !== -1) {
        const availableSeats = row.length - startIndex;
        const numSeatsToReserve = Math.min(seatsToReserve, availableSeats);
        this.markSeatsAsReserved(row, startIndex, numSeatsToReserve);

        seatsReserved += numSeatsToReserve;
        seatsToReserve -= numSeatsToReserve;

        if (seatsReserved === this.numSeats) {
          break;
        }

        if (!prioritySeatsFound) {
          prioritySeatsFound = true;
        }
      }
    }
  }

  findAvailableSeats(row: any[], prioritySeatsFound: boolean) {
    let startIndex = -1;

    for (let i = 0; i < row.length; i++) {
      if (row[i].reserved) {
        startIndex = -1; // Reset startIndex if a reserved seat is encountered
      } else {
        if (prioritySeatsFound || startIndex === -1) {
          startIndex = i;
        }

        if (i - startIndex + 1 === this.numSeats) {
          return startIndex;
        }
      }
    }

    return startIndex; // Return startIndex even if all priority seats are booked
  }
}

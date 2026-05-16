import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  balanceamount: number = 10000;

  getBalance() {
    return this.balanceamount;
  } buys(amount: number) {
    this.balanceamount = this.balanceamount - amount
  }
  sell(amount: number) {
    this.balanceamount = this.balanceamount + amount
  }
}
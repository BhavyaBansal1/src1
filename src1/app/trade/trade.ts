import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../balance-service';
import { Holdings } from '../holdings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade',
  imports: [FormsModule, CommonModule],
  templateUrl: './trade.html',
  styleUrl: './trade.css',
})
export class Trade implements OnInit {

  price: number = 90;
  quantity: number = 1;
  stockName: string = '';
  msg: string = '';
  Ordervalue: number = 0;
  Transactions: any[] = [];
  currenttime: any;
  holdingtype: string = 'stock';
  intervalId: any;

  constructor(
    public balanceService: BalanceService,
    public holdingservice: Holdings
  ) { }

  ngOnInit() {
    try {
      const data = localStorage.getItem('transactions');
      this.Transactions = data ? JSON.parse(data) : [];
    } catch (e) {
      this.Transactions = [];
    }
    try {
      let change = (Math.random() * 10 - 5);
      this.price = Math.max(1, Math.round(this.price + change));
    } catch (e) {
    }
  }

  calculateOrderValue() {
    try {
      this.Ordervalue = this.price * this.quantity;
    } catch (e) {
      (e);
    }
  }
  saveRecentTransactions() {
    try {
      this.Transactions = this.Transactions.slice(0, 5);
      localStorage.setItem('transactions', JSON.stringify(this.Transactions));
    } catch (e) {
    }
  }
  buy() {
    try {
      const cost = this.quantity * this.price;
      if (!this.stockName) {
        this.msg = "Enter stock name";
        return;
      }
      if (cost > this.balanceService.balanceamount) {
        this.msg = "Not enough balance";
        return;
      }
      this.balanceService.buys(cost);
      this.holdingservice.buy(
        this.stockName,
        this.quantity,
        Date.now(),
        this.holdingtype,
        this.price
      );
      this.Transactions.push({
        stockName: this.stockName,
        Quantity: this.quantity,
        Price: this.price,
        CurrentTime: Date.now(),
        type: 'Buy'
      });
      this.saveRecentTransactions();
      this.msg = "Stocks bought successfully";

    } catch (error) {
      (error);
      this.msg = "Error while buying";
    }
  }
  sell() {
    try {
      const cost = this.quantity * this.price;
      const check = this.holdingservice.sell(
        this.stockName,
        this.quantity,
        Date.now()
      );
      if (!check) {
        this.msg = "Not enough shares";
        return;
      }
      this.balanceService.sell(cost);
      this.Transactions.push({
        stockName: this.stockName,
        Quantity: this.quantity,
        Price: this.price,
        type: "Sell",
        CurrentTime: Date.now()
      });

      this.saveRecentTransactions();
      this.msg = "Stocks sold sucessfully";

    } catch (error) {
      (error);
      this.msg = "Error while selling";
    }
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Holdings {

  list: any[] = [
    {
      stockName: 'Microsoft',
      quantity: 10,
      currenttime: Date.now(),
      type: 'stock',
      price: 100,
      avgPrice: 150
    }, {
      stockName: 'Microfund',
      quantity: 26,
      currenttime: Date.now(),
      type: 'Fund',
      price: 169,
      avgPrice: 150
    },
    {
      stockName: 'tata',
      quantity: 25,
      currenttime: Date.now(),
      type: 'stock',
      price: 168,
      avgPrice: 196
    },
    {
      stockName: 'tesla',
      quantity: 5,
      currenttime: Date.now(),
      type: 'stock',
      price: 200,
      avgPrice: 189
    },
    {
      stockName: 'aapl',
      quantity: 15,
      currenttime: Date.now(),
      type: 'stock',
      price: 150,
      avgPrice: 156
    }
  ];


  updatePrices() {
    for (let stock of this.list) {
      let change = (Math.random() * 10 - 5);
      stock.price = Math.round(stock.price + change);
      // stock.currenttime = Date.now();
      this.list = this.list;
    }
  }

  buy(stockName: string, quantity: number, currenttime: any, type: string, price: number) {

    const check = this.list.find(s => s.stockName === stockName);

    if (check) {
      if (quantity > 0) {
        check.quantity += quantity;
        check.currenttime = Date.now();
        check.price = price;
        check.type = type;
        check.avgprive = 24;
      }
    }
  }

  sell(stockName: string, quantity: number, currenttime: any) {

    const check = this.list.find(s => s.stockName === stockName);

    if (!check || check.quantity < quantity) {
      return false;
    } else {
      check.quantity -= quantity;
      check.currenttime = Date.now();
      return true;
    }
  }

  get_all_Holdings() {
    return this.list;
  }

  getQuantity(stockName: string): number {
    const stock = this.list.find(s => s.stockName === stockName);
    return stock ? stock.quantity : 0;
  }
}
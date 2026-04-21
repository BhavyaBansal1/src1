import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Holdings } from '../holdings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holding',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './holding.html',
  styleUrls: ['./holding.css'],
})
export class holding {

  portfolioValue: number = 0;
  list1: any[] = [];
  intervalid: any;
  autore: boolean = false;

  constructor(public holdingservice: Holdings, public cd: ChangeDetectorRef) {
    this.get_all_Holdings();
  }
  //   updatePortfolioValue() {
  //     const holdings = this.holdingservice.get_all_Holdings();
  //     let total = 0;
  //     for (let i of holdings) {
  //   total +=i.quantity * i.price;
  // }
  //     this.portfolioValue = total;
  //   }

  get_all_Holdings() {
    this.list1 = this.holdingservice.get_all_Holdings();
  }

  getstocks() {
    return this.list1;
  }
  // .filter(s => s.type === 'stock')

  pagereload() {
    try {
      this.holdingservice.updatePrices();
    } catch (e) {
      
    }
  }
  toggle_load() {
    try {
      this.autore = !this.autore;
      if (this.autore) {
        this.intervalid = window.setInterval(() => {
          this.pagereload();
          // this.updatePortfolioValue;
          this.cd.detectChanges();
        }, 5000)
      }
      else {
        if (this.intervalid) {
          clearInterval(this.intervalid);
        }
      }
    }
    catch (e) {
      ;
    }
  }
}
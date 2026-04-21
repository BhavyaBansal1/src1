import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { holding } from '../holding/holding';
import Chart from 'chart.js/auto';
import { Holdings } from '../holdings';
import { ChartComponent } from '../chart/chart';
import { BalanceService } from '../balance-service';
import { DatePipe } from '@angular/common';
import { summary } from '../summary/sumary';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [summary,holding, ChartComponent,DatePipe],
  templateUrl:'./dashboard.html',
  styleUrl: './dashboard.css',
})
export class dashboard implements AfterViewInit {

  portfolioValue: number = 0;
date:any;
  stockChart!: Chart;

  constructor(
    public holdingservice: Holdings, public balanceService: BalanceService, public cd:ChangeDetectorRef) { 
      
    }

  ngOnInit() {
    this.updatePortfolioValue();
    this.createStockChart();
    this.date=new Date();
    setInterval(() => {
      this.updatePortfolioValue();
      this.date=new Date();
      this.cd.detectChanges();
    }, 1000);
  }

  updatePortfolioValue() {
    try {
      const holdings = this.holdingservice.get_all_Holdings();
      let total = 0;
      holdings.forEach(stock => {
        total += stock.quantity * stock.price;
      });

      this.portfolioValue = total;
    } catch (e) {
      ;
    }
  }
  getstocks() {
    return this.holdingservice.get_all_Holdings();
  }

  ngAfterViewInit() {
    this.createStockChart();

    setTimeout(() => {
      this.createStockChart();
    }, 0);
  }

  createStockChart() {
    try {
      if (this.stockChart) {
        this.stockChart.destroy();
      }
      const stocks = this.getstocks();
      this.stockChart = new Chart("stockChart", {
        type: 'bar',
        data: {
          labels: stocks.map(s => s.stockName),
          datasets: [{
            label: 'Stock Quantity',
            data: stocks.map(s => s.quantity)
          }]
        },
        options: {
          responsive: true
        }
      });

    } catch (e) {
      ;
    }
  }



}
// createMFChart() {
//   const mf = this.getmutualfund();

//   new Chart("mfChart", {
//     type: 'pie',
//     data: {
//       labels: mf.map(m => m.stockName),
//       datasets: [{
//         data: mf.map(m => m.quantity)
//       }]
//     },
//     options: {
//       responsive: true
//     }
//   });
// }

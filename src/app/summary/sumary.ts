import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { holding } from '../holding/holding';
import { Holdings } from '../holdings';
import { AuthService } from '../auth-service';
import { BalanceService } from '../balance-service';
import { Chart } from 'chart.js';
import { ChartComponent } from '../chart/chart';

@Component({
  selector: 'app-sumary',
  imports: [RouterOutlet, holding,ChartComponent],
  templateUrl: './sumary.html',
  styleUrl: './sumary.css',
})
export class summary implements AfterViewInit {

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

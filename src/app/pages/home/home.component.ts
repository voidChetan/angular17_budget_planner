import { Component, inject, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ExpenseComponent } from '../expense/expense.component';
import { IncomeComponent } from '../income/income.component';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent,ExpenseComponent,IncomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  selectedTab: string = 'Dashboard';
  transacationList: any[]=[];

  incomeMasterId: number = 0;
  expenseMasterId: number = 0;
  masterService = inject(MasterService)

  changeTab(tab:string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.getTranscationType()
  }
  getTranscationType () {
    this.masterService.getAllTransactionType().subscribe((res:any)=>{
      this.transacationList = res.data;
      const income = this.transacationList.find(m=>m.masterName =='Income');
      if(income) {
        this.incomeMasterId = income.masterId;
      }
      const expense = this.transacationList.find(m=>m.masterName =='Expense');
      if(income) {
        this.expenseMasterId = expense.masterId;
      }
    })
  }
}

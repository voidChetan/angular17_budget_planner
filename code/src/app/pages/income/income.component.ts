import { Component,Input, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {
  @Input() masterId: number = 0;

  transcationObj : any = {
    "transactionId": 0,
    "userId": 0,
    "categoryId": 0,
    "amount": 0,
    "date": "2024-05-04T10:47:53.460Z",
    "purpose": "",
    "transactionTypeId": 0
  }
  masterService = inject(MasterService);
  categoryList: any[]=[];
  transcationList: any[]=[];

  constructor() {
    const loggedUser =  sessionStorage.getItem('budgetUser');
    if(loggedUser != null) {
      this.transcationObj.userId =  JSON.parse(loggedUser).userId;
    }
  }

  ngOnInit(): void {
    this.getAllTranscations(); 
  }

  getCategoryByUser() {
    this.masterService.getCategoryByUserId(this.transcationObj.userId).subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }
  getAllTranscations() {
    this.masterService.GetTranscationByTypeId(this.masterId, this.transcationObj.userId).subscribe((res:any)=>{
      this.transcationList = res.data;
    })
  }
  onSave() {
    debugger;
    this.transcationObj.transactionTypeId = this.masterId;
    this.masterService.addNewTranscation(this.transcationObj).subscribe((res:any)=>{
      if(res.result) {
        alert('Item Addedd Succes');
        this.getAllTranscations(); 
        this.closeModel();
      } else {
        alert(res.message)
      }
    })
  }
  openModel() {
    this.getCategoryByUser();
    const modal =  document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'block'
    }
  }

  closeModel() {
    const modal =  document.getElementById('myModal');
    if(modal != null) {
      modal.style.display = 'none'
    }
  }


}

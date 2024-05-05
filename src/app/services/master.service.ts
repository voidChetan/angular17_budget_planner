import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURL: string = 'https://projectapi.gerasim.in/api/BudgetPlanner/';
  constructor(private http : HttpClient) { }

  createUser(obj:any) {
   return this.http.post(`${this.apiURL}AddNewUser`,obj)
  }

  loginUser(obj:any) {
    return this.http.post(`${this.apiURL}login`,obj)
   }

   getAllTransactionType () {
    return this.http.get(`${this.apiURL}GetAllTransactionType`)
   }

   getCategoryByUserId(id: number) {
    return this.http.get(`${this.apiURL}GetCategoryByUserId?userId=${id}`)
   }

   addNewTranscation(obj:any) {
    return this.http.post(`${this.apiURL}AddNewTransaction`,obj)
   }

   GetTranscationByTypeId(transactionTypeId: number, userId: number) {
    return this.http.get(`${this.apiURL}GetTranscationByTypeId?transactionTypeId=${transactionTypeId}&userId=${userId}`)
   }

   GetDashboardData(userId:number,fromDate: string,toDate: string) {
    return this.http.get(`${this.apiURL}GetDashboardData?userId=${userId}&fromDate=${fromDate}&toDate=${toDate}`)
   }



  
   
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLogin:boolean= false;

  register: any = { 
      "userId": 0,
      "userName":"",
      "emailId":"",
      "fullName":"",
      "role":"",
      "createdDate": new Date(),
      "password":"" 
  }

  loginObj: any = {
    "userName": "",
    "password": ""
  }
  masterService = inject(MasterService);
  router = inject(Router);

  createUser() {
    debugger;
    this.masterService.createUser(this.register).subscribe((res:any)=>{
      if(res.result) {
        alert('User Created')
      } else {
        alert(res.message)
      }
    })
  }

  onLogin() {
    debugger;
    this.masterService.loginUser(this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        sessionStorage.setItem('budgetUser',JSON.stringify(res.data))
        this.router.navigateByUrl('home')
      } else {
        alert(res.message)
      }
    })
  }


}

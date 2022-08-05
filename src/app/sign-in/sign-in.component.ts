import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errormsg:string = ''
  isLoading:boolean = false
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]),
  })

  submitLogin(log:FormGroup)
  {
    this.isLoading =true
    this._authservice.signin(log.value).subscribe({
      next:(response)=>{
        if(response.message === 'success')
        {


          this.isLoading =false
          localStorage.setItem('userToken',response.token)
          localStorage.setItem('id',response.user._id)
          this._authservice.userData()
          this._Router.navigate(['/main'])
        }
        else{
            this.errormsg = response.message
            this.isLoading =false
        }
      }
    })

  }

  constructor(private _authservice:AuthService ,private _Router:Router) {
    if(localStorage.getItem('userToken'))
    {
      this._Router.navigate(['/main'])
    }
  }

  ngOnInit(): void {
  }

}

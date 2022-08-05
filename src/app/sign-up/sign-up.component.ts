import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errormsg:string = ''
  isLoading:boolean = false
  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    last_name:new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age:new FormControl(null, [Validators.required, Validators.min(12)]),
    email:new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")]),
  })

  submitRegister(regs:FormGroup)
  {
    this.isLoading =true
    this._authservice.signup(regs.value).subscribe({
      next:(response)=>{
        if(response.message === 'success')
        {
          this.isLoading =false
          this._Router.navigate(['/signin'])
        }
        else{
            this.errormsg = response.message
            this.isLoading =false
        }
      }
    })

  }

  constructor(private _authservice:AuthService ,private _Router:Router) { }

  ngOnInit(): void {
  }



}

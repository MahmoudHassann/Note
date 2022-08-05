import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(private _authservice:AuthService) { }

  userName:string = ''
  dataValue:any = {}
  isLogin:boolean = false

  logout()
  {
    this._authservice.signout()
  }

  ngOnInit(): void {
    this._authservice.data.subscribe({
      next:()=>{
        if(this._authservice.data.getValue() != null)
        {
          this.isLogin =true
          this.dataValue = this._authservice.data.getValue()
          this.userName =this.dataValue.first_name

        }
        else{
          this.isLogin = false
          this.userName = ''
        }
      }
    })
  }



}

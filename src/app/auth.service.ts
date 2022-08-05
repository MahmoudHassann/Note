import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  encodedToken:any =''
  userId:any =''
  noteID:any = ''


  constructor(private _HttpClient:HttpClient, private _router:Router) {

    if(localStorage.getItem('userToken'))
    {
      this.userData()
    }
   }

  data = new BehaviorSubject(null)

  userData()
  {
    this.encodedToken = localStorage.getItem('userToken')
    this.userId = localStorage.getItem('id')
    this.noteID = localStorage.getItem('noteID')
    let decodeToken:any = jwtDecode(this.encodedToken)
    this.data.next(decodeToken)



  }

  signup(formData:object):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signup', formData)
  }
  signin(formData:object):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signin', formData)
  }
  signout()
  {
    localStorage.removeItem('userToken')
    localStorage.removeItem('id')
    localStorage.removeItem('noteID')
    this.data.next(null)
    this._router.navigate(['/signin'])
  }


}

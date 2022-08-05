import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { noteDetails } from './addnote';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddNoteService {

  constructor(private _httpClient: HttpClient, private _auth:AuthService ) {}

  addNote(data:object):Observable<any>
  {
    return this._httpClient.post("https://routeegypt.herokuapp.com/addNote",data)
  }
  showUserData(data:object):Observable<any>
  {
    return this._httpClient.post("https://routeegypt.herokuapp.com/getUserNotes",data)
  }
  deleteNote():Observable<any>
  {
    let option:object = {
      body:{
        NoteID:this._auth.noteID,
        token:this._auth.encodedToken
      }
    }
    return this._httpClient.delete("https://routeegypt.herokuapp.com/deleteNote",option)
  }
  updateNote(data:object):Observable<any>
  {
    return this._httpClient.put("https://routeegypt.herokuapp.com/updateNote",data)
  }

}

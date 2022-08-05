import { Component, OnInit } from '@angular/core';
/* import * as $ from 'jquery' */
import { FormGroup, FormControl } from '@angular/forms';
import { AddNoteService } from '../add-note.service';
import { note, userNotes, noteDetails, UpdateNote } from './../addnote';
import { AuthService } from './../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

declare let $:any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  noteid:any
  NotesNotFound:string=''
  isLoading:boolean = false
  notes:userNotes={
    citizenID:this._auth.userId,
    token:this._auth.encodedToken
  }
  notesDetails:noteDetails={
    NoteID:this._auth.noteID,
    token:this._auth.encodedToken
  }

Notes =new Array
  constructor(private _addNote:AddNoteService , private _auth:AuthService) {

    this.userNotes();
   }

  ngOnInit(): void {
  }

  update:FormGroup =new FormGroup({
    title:new FormControl(null),
    desc:new FormControl(null),
  })
  add:FormGroup =new FormGroup({
    title:new FormControl(null),
    desc:new FormControl(null),
  })
  dataaa:note={
    title:this.add.value.title,
    desc:this.add.value.desc,
    userID:this._auth.userId,
    token:this._auth.encodedToken
  }
  UpdateNote:UpdateNote={
    title:this.update.value.title,
    desc:this.update.value.desc,
    NoteID:this._auth.noteID,
    token:this._auth.encodedToken
  }

  getId(id:any)
  {
    this.noteid=id
    localStorage.setItem('noteID',id)
    this._auth.userData()
  }
  deleteNote()
  {
    this._addNote.deleteNote().subscribe({
      next:(res)=>{
        console.log(res.message);

        if(res.message === 'deleted')
        {
          this.userNotes()
          $('#exampleModal').modal('hide')
        }

      }
    })
  }
  updateNote()
  {
    for(let i=0; i<this.Notes.length;i++)
    {
      if(this.Notes[i]._id == this.noteid)
      {
        console.log(this.Notes[i]);
        console.log(this._auth.noteID);
        this.update.controls['title'].setValue(this.Notes[i].title)
        this.update.controls['desc'].setValue(this.Notes[i].desc)
      }
    }
  }


  showNoteDetails()
  {
    $(".noteDetails").css('visibility','visible')
    $(".noteDetails .box").css('top','0')
  }

  close()
  {
    $('.noteDetails .box').css('top','-100%')
    $('.noteDetails').css('visibility','hidden')
  }

  userNotes(){
    this._addNote.showUserData(this.notes).subscribe({
      next:(res)=>{
        console.log(res.message);

        if(res.message === 'success')
        {
          this.isLoading =true
          this.Notes = res.Notes
          console.log(this.Notes);
        }
        else if(res.message === 'no notes found'){
          this.NotesNotFound = "No Notes Found"
          this.isLoading =true
          this.Notes = res.Notes
        }
      }
    })
  }
  makeNote()
  {
    this.dataaa.title=this.add.value.title
    this.dataaa.desc=this.add.value.desc
    console.log(this.dataaa);

    this._addNote.addNote(this.dataaa).subscribe({
      next:(res)=>{
        if(res.message === 'success')
        {
          $('.noteDetails .box').css('top','-100%')
          $('.noteDetails').css('visibility','hidden')
          this.userNotes()
          this.add.reset()
        }
      }
    })
  }
  noteUpdate()
  {
    this.UpdateNote.title=this.update.value.title
    this.UpdateNote.desc=this.update.value.desc
    this.UpdateNote.NoteID=this.noteid
    console.log(this.UpdateNote);
    this._addNote.updateNote(this.UpdateNote).subscribe({
      next:(res)=>{
        if(res.message === 'updated')
        {
          $('#exampleModal2').modal('hide')
          this.userNotes()
        }
      }
    })
  }






}


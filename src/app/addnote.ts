export interface note {
  title:string,
  desc:string,
  userID:string,
  token:string
}
export interface UpdateNote {
  title:string,
  desc:string,
  NoteID:string,
  token:string
}
export interface userNotes {
  citizenID:string,
  token:string
}
export interface noteDetails {
  NoteID:any,
  token:any
}

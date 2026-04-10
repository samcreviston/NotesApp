import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

@Injectable({
  providedIn: "root"
})
export class NotesService {
  private readonly apiUrl = "http://localhost:5000/api/notes";

  constructor(private readonly http: HttpClient) {}

  // Send GET request to load all notes
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  // Send POST request to create a new note
  createNote(note: { content: string }): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  // Send PUT request to update a note by ID
  updateNote(id: string, note: { content: string }): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  // Send DELETE request to remove a note by ID
  deleteNote(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}

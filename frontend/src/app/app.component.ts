import { Component } from "@angular/core";
import { NotesListComponent } from "./components/notes-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NotesListComponent],
  template: `<app-notes-list></app-notes-list>`
})
export class AppComponent {}

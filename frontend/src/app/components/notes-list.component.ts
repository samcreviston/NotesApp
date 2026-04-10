import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Note, NotesService } from "../services/notes.service";
import { NoteFormComponent } from "./note-form.component";

@Component({
  selector: "app-notes-list",
  standalone: true,
  imports: [CommonModule, NoteFormComponent],
  template: `
    <main class="wrapper">
      <section class="notes-panel">
        <h1>Notes</h1>

        <app-note-form
          [editingNote]="editingNote"
          (create)="createNote($event)"
          (update)="updateNote($event)"
          (cancel)="cancelEdit()"
        ></app-note-form>

        <div *ngIf="notes.length === 0" class="empty">No notes yet.</div>

        <article class="note-card" *ngFor="let note of notes">
          <p>{{ note.content }}</p>
          <small>{{ note.createdAt | date: 'short' }}</small>
          <div class="actions">
            <button type="button" (click)="startEdit(note)">Edit</button>
            <button type="button" class="danger" (click)="deleteNote(note._id)">Delete</button>
          </div>
        </article>
      </section>
    </main>
  `,
  styles: [
    `
      .wrapper {
        width: 100%;
        max-width: 680px;
      }

      .notes-panel {
        background: #161b21;
        border-radius: 14px;
        padding: 18px;
      }

      h1 {
        margin-top: 0;
        margin-bottom: 12px;
      }

      .empty {
        color: var(--muted);
      }

      .note-card {
        margin-top: 12px;
        background: var(--card);
        border-radius: 12px;
        padding: 12px;
      }

      p {
        margin: 0 0 8px;
        white-space: pre-wrap;
      }

      small {
        color: var(--muted);
      }

      .actions {
        margin-top: 10px;
        display: flex;
        gap: 8px;
      }

      button {
        border: 0;
        border-radius: 8px;
        padding: 7px 12px;
        background: var(--accent);
        color: #fff;
        cursor: pointer;
      }

      .danger {
        background: var(--danger);
      }
    `
  ]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  editingNote: Note | null = null;

  constructor(private readonly notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  // Load notes list from backend
  loadNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (error) => {
        console.error("Failed to load notes", error);
      }
    });
  }

  // Create a note then refresh list
  createNote(content: string): void {
    this.notesService.createNote({ content }).subscribe({
      next: () => this.loadNotes(),
      error: (error) => {
        console.error("Failed to create note", error);
      }
    });
  }

  startEdit(note: Note): void {
    this.editingNote = { ...note };
  }

  cancelEdit(): void {
    this.editingNote = null;
  }

  // Update a note then refresh list
  updateNote(note: Note): void {
    this.notesService.updateNote(note._id, { content: note.content }).subscribe({
      next: () => {
        this.editingNote = null;
        this.loadNotes();
      },
      error: (error) => {
        console.error("Failed to update note", error);
      }
    });
  }

  // Delete a note then refresh list
  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe({
      next: () => this.loadNotes(),
      error: (error) => {
        console.error("Failed to delete note", error);
      }
    });
  }
}

import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Note } from "../services/notes.service";

@Component({
  selector: "app-note-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-card">
      <h2>{{ editingNote ? 'Edit Note' : 'Add Note' }}</h2>
      <textarea
        [(ngModel)]="content"
        rows="4"
        placeholder="Write a note..."
      ></textarea>

      <div class="actions">
        <button type="button" (click)="submit()">
          {{ editingNote ? 'Save' : 'Create' }}
        </button>
        <button
          *ngIf="editingNote"
          type="button"
          class="secondary"
          (click)="cancel.emit()"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .form-card {
        background: var(--panel);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
      }

      h2 {
        margin: 0 0 12px;
        font-size: 1.1rem;
      }

      textarea {
        width: 100%;
        resize: vertical;
        border: 1px solid #38404a;
        border-radius: 10px;
        background: #15191e;
        color: var(--text);
        padding: 10px;
      }

      .actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }

      button {
        border: 0;
        border-radius: 8px;
        padding: 8px 14px;
        background: var(--accent);
        color: #fff;
        cursor: pointer;
      }

      .secondary {
        background: #4b5563;
      }
    `
  ]
})
export class NoteFormComponent implements OnChanges {
  @Input() editingNote: Note | null = null;
  @Output() create = new EventEmitter<string>();
  @Output() update = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();

  content = "";

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["editingNote"]) {
      this.content = this.editingNote?.content ?? "";
    }
  }

  // Emit create or update event based on current form mode
  submit(): void {
    const value = this.content.trim();
    if (!value) {
      return;
    }

    if (this.editingNote) {
      this.update.emit({ ...this.editingNote, content: value });
      return;
    }

    this.create.emit(value);
    this.content = "";
  }
}

// src/services/notes.service.ts
import { Injectable } from '@nestjs/common';
import { Note, NoteDocument } from '../note.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { initialNotes } from '../helpers/notes.mock';

@Injectable()
export class NotesService {
  private readonly notes: NoteDocument[] = initialNotes.map(note => new this.noteModel(note));

  constructor(@InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>) {}

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: string): Note {
    return this.notes.find(note => note.id === id);
  }

  createNote(note: Note): Note {
    const newNote = new this.noteModel(note);
    this.notes.push(newNote);
    return newNote;
  }

  updateNote(id: string, updatedNote: Note): Note {
    const note = this.getNoteById(id);
    if (!note) {
      return null;
    }
    Object.assign(note, updatedNote);
    return note;
  }

  deleteNoteById(id: string): boolean {
    const index = this.notes.findIndex(note => note.id === id);
    if (index >= 0) {
      this.notes.splice(index, 1);
      return true;
    }
    return false;
  }

  getStats(): { active: number; archived: number } {
    const stats = { active: 0, archived: 0 };
    this.notes.forEach(note => {
      if (!note.archived) {
        stats.active++;
      } else {
        stats.archived++;
      }
    });
    return stats;
  }
}

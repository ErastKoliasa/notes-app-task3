// src/routes/notes.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NotesService } from 'src/services/note.service';
import { Note } from '../note.entity';
import { YupValidationPipe} from '../helpers/yup-validation.pipe';
import * as yup from 'yup';

const noteSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  date: yup.date().required(),
  category: yup.string().required(),
  content: yup.string().required(),
  archived: yup.boolean().required(),
});

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAllNotes(): Note[] {
    return this.notesService.getAllNotes();
  }

  @Get('stats')
  getStats(): { active: number; archived: number } {
    return this.notesService.getStats();
  }

  @Get(':id')
  getNoteById(@Param('id') id: number): Note {
    return this.notesService.getNoteById(id);
  }

  @Post()
  createNote(@Body(new YupValidationPipe(noteSchema)) note: Note): Note {
    return this.notesService.createNote(note);
  }

  @Patch(':id')
  updateNote(
    @Param('id') id: number,
    @Body(new YupValidationPipe(noteSchema)) updatedNote: Note,
  ): Note {
    return this.notesService.updateNote(id, updatedNote);
  }

  @Delete(':id')
  deleteNoteById(@Param('id') id: number): boolean {
    return this.notesService.deleteNoteById(id);
  }
}

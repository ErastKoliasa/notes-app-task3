// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './routes/notes.controller';
import { Note, NoteSchema } from './note.entity';
import { NotesService } from './services/note.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/notes-app'),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}

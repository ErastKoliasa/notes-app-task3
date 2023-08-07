import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './routes/notes.controller';
import { NotesService } from './services/note.service';

describe('NotesController', () => {
  let appController: NotesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    appController = app.get<NotesController>(NotesController);
  });
});

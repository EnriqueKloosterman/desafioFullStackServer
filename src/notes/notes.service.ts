import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ){}
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const newNote = this.noteRepository.create(createNoteDto);
      newNote.title = createNoteDto.title;
      newNote.note = createNoteDto.note;
      return await this.noteRepository.save(newNote);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    const notes = await this.noteRepository.find();
    try {
      if(!notes) {
        throw new Error('No notes found');
      }
      return notes
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)  
    }
  }

  async findOne(id: string) {
    const note = await this.noteRepository.findOne({
      where: {
        id: id
      }
    })
    try {
      if(!note) throw new BadRequestException('Note not found');
      await this.noteRepository.delete(note);
    } catch (error) {
      throw new BadRequestException('Note not found')
    }
  }

  async remove(id: string): Promise<void> {
    const note = await this.noteRepository.findOne({
      where: {
        id: id
      }
    });
    if (!note) throw new BadRequestException('Note not found');
    await this.noteRepository.remove(note); 
  }
  
}

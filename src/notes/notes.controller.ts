import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createNoteDto: CreateNoteDto): Promise<CreateNoteDto>{
    try {
      return this.notesService.create(createNoteDto);
    } catch (error) {
      throw new HttpException('error creating note', HttpStatus.BAD_REQUEST)
    }
  }

  @Get('notes')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(): Promise<CreateNoteDto[]> {
    try {
      const notes = await this.notesService.findAll();
      if(notes.length){
        return notes;
      }
    } catch (error) {
      throw new HttpException('error finding notes', HttpStatus.BAD_REQUEST)
    }
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Delete('note/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.notesService.remove(id); 
    } catch (error) {
      throw new HttpException('error deleting note', HttpStatus.BAD_REQUEST);
    }
  }
  
}

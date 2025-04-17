import { Body, Controller, Delete, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';


//make grammer check endpoint
@Controller('notes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    return this.appService.getNotes();
  }

  @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  createNote( @Body('title') title: string, @Body('content') file: string) {
    return this.appService.createNote(title,file);
  }

  @Delete(':id')
  deleteNote(@Body('id') id: string) {
    return this.appService.deleteNote(id);
  }

  @Post('check')
  checkGrammar(@Body('text') text: string) {
    return this.appService.checkGrammar(text);
  }


}


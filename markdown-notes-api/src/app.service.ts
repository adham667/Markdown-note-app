import { Injectable } from '@nestjs/common';
import { marked } from 'marked';
import { Model } from 'mongoose';
import { Note } from './app.module';
import { InjectModel } from '@nestjs/mongoose';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { htmlToText } from 'html-to-text';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Note') private noteModel: Model<Note>,
    private readonly httpService: HttpService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createNote(title:string, file: string) {
    console.log(file);
    
    const newnote = new this.noteModel({
      title: title,
      content: marked(file),
      createdAt: new Date(),
    });
    console.log(newnote);
    return newnote.save();
  }

  async getNotes() {
    const notes = await this.noteModel.find().exec();
    return notes;
  }



  deleteNote(id: string) {
    return this.noteModel.findByIdAndDelete(id).exec().then((result) => {
      if (result) {
        return { message: 'Note deleted successfully' };
      } else {
        return { message: 'Note not found' };
      }
    });
  }


  async checkGrammar(text: string): Promise<any> {
    const plainText = htmlToText(text, {
      wordwrap: false, // Disable word wrapping
    });
    const response = await firstValueFrom(
      this.httpService.post('https://api.languagetoolplus.com/v2/check', null, {
        params: {
          text: plainText,
          language: 'en-US',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    );
    return response.data;
  }
}

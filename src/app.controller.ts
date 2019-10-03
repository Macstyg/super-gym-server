import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/super/:id')
  getSecond(@Param('id') id: string): string {
    return `This id is ${id}`;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerDto } from './dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('log')
  async log(@Body() body: LoggerDto) {
    return this.appService.log(body);
  }

  @Post('exception')
  async exception(@Body() body: LoggerDto) {
    return await this.appService.exception(body);
  }

  @Get('health-check')
  healthCheck() {
    return this.appService.healthCheck();
  }
}

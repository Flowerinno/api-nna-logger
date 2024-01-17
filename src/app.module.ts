import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, LoggerService, PrismaService],
})
export class AppModule {}

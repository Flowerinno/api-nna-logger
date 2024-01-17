import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { LoggerRequest } from './types/request';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {}

  async healthCheck() {
    return {
      message: 'App - OK',
      logger: await this.logger.loggerHealthCheck(),
    };
  }

  async log(body: LoggerRequest) {
    const { api_key, logger_name, message, level } = body;

    try {
      const result = await this.logger.log(
        api_key,
        logger_name,
        message,
        level,
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { message: error.message };
      } else {
        return { message: 'An unknown error occurred' };
      }
    }
  }

  async exception(body: LoggerRequest) {
    const { api_key, logger_name, message, level } = body as LoggerRequest;

    try {
      const result = await this.logger.log(
        api_key,
        logger_name,
        message,
        level,
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { message: error.message };
      } else {
        return { message: 'An unknown error occurred' };
      }
    }
  }
}

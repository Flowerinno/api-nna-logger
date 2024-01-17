import { Injectable } from '@nestjs/common';
import { Errors } from 'src/types/errors';
import { PrismaService } from 'src/prisma';

@Injectable()
export class LoggerService {
  constructor(private prismaService: PrismaService) {}

  async validateLog(
    api_key: string,
    logger_name: string,
    message: string,
    level: string,
  ): Promise<any> {
    if (!api_key) throw new Error(Errors.NO_API_KEY);
    if (!message) throw new Error(Errors.NO_MESSAGE);
    if (!level) throw new Error(Errors.NO_LEVEL);

    const user = await this.prismaService.user.findUnique({
      where: {
        api_key,
      },
    });

    if (!user) {
      throw new Error(Errors.USER_NOT_FOUND);
    }

    await this.prismaService.user.update({
      where: {
        api_key,
      },
      data: {
        api_calls: {
          increment: 1,
        },
      },
    });

    return { user };
  }

  async log(
    api_key: string,
    logger_name: string,
    message: string,
    level: string,
  ) {
    const { user } = await this.validateLog(
      api_key,
      logger_name,
      message,
      level,
    );

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    const logger = await this.prismaService.logger.update({
      where: {
        logger_name,
      },
      data: {
        total_logs: {
          increment: 1,
        },
      },
    });

    if (!logger) throw new Error(Errors.NO_LOGGER_WITH_NAME);

    await this.prismaService.logs.create({
      data: {
        message,
        level,
        logger_id: logger.id,
      },
    });

    return {
      message: 'Successfully logged',
    };
  }

  async getLogs(api_key: string, logger_name: string) {
    if (!logger_name) throw new Error(Errors.NO_LOGGER_NAME);
    if (!api_key) throw new Error(Errors.NO_API_KEY);

    const user = await this.prismaService.user.findUnique({
      where: {
        api_key,
      },
    });

    if (!user) throw new Error(Errors.USER_NOT_FOUND);

    const logs: any = [];

    return {
      logs,
    };
  }

  async loggerHealthCheck() {
    const logger = await this.prismaService.logger.findUnique({
      where: {
        logger_name: 'nna',
      },
    });
    return { message: 'Logger - OK', logger: logger.user_id ?? 'No logger' };
  }
}

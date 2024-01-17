import { IsNotEmpty, IsString } from 'class-validator';

export class LoggerDto {
  @IsString()
  @IsNotEmpty()
  api_key: string;

  @IsString()
  @IsNotEmpty()
  logger_name: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}

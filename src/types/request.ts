export interface ConnectionRequest {
  apiKey: string;
}

export interface LoggerRequest {
  api_key: string;
  logger_name: string;
  message: string;
  level: string;
}

export interface LogsRequest {
  userId: string;
}

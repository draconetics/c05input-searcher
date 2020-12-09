export class HttpException extends Error {
    status: number;
    message: string;
    description: string | null;
  
    constructor(statusCode: number, message: string, description?: string) {
      super(message);
  
      this.status = statusCode;
      this.message = message;
      this.description = description || null;
    }
}
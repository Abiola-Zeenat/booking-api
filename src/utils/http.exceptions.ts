export class HttpException extends Error {
  public status: string = 'failure';
  public message: string;
  public statusCode: number;
  public data?: any[] | Record<string, any>;
  

  constructor(
    statusCode: number,
    message: string,
    data?: any[] | Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    if (data) {
      this.data = data;
    }
  }
}

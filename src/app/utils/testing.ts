import { Response } from '@angular/http';

export class ErrorResponse extends Response implements Error {
  name: string;
  message: string;
}

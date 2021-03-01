interface IAjaxError<R = unknown> extends Error {
  message: string;
  status: number;
  response: R;
}

export class AjaxError implements IAjaxError {
  message: string;
  status: number;
  response: unknown;
  name: string;

  constructor(errorStatus: number, errorMessage = 'Ajax Error') {
    this.status = errorStatus;
    this.message = errorMessage;
    this.name = 'Ajax Error';
  }
}

export class LibraryExceptions extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, LibraryExceptions.prototype);

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

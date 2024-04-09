class ApiError implements Error {
  constructor(message: string) {
    this.name = "ApiError";
    this.message = message;
  }
  name: string;
  message: string;
  stack?: string;
}

export { ApiError };
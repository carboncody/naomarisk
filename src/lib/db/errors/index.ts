export class ForbiddenError extends Error {
  constructor(
    message: string,
    public statusCode = 403,
  ) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class NotFoundError extends Error {
  constructor(
    message: string,
    public statusCode = 404,
  ) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
  ) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

export function createErrorResponse(
  statusCode: number,
  message = 'Bad request',
) {
  return {
    success: false,
    error: {
      statusCode,
      message,
    },
  };
}

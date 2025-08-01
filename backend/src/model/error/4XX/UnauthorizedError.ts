import { HttpError } from 'src/model/error/HttpError';

/**
 * unauthorized error class (401)
 */
export class UnauthorizedError extends HttpError {
  constructor(message?: string, code?: string) {
    super(401, message ?? 'Unauthorized');
    this.name = 'UnauthorizedError';
    this.code = code ?? 'UNAUTHORIZED';
  }
}

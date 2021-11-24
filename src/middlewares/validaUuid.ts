import { Request, Response, NextFunction } from 'express';
import { validate as isUuid } from 'uuid';
import AppError from '../errors/AppError';

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const { id } = request.params;
    if (!isUuid(id)) {
        throw new AppError('Invalid ID.', 401);
    }

    return next();
}

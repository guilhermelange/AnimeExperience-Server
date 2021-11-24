import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import animesRouter from './animes.routes';

const routes = Router();
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/animes', animesRouter);

export default routes;

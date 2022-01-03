import { Router } from 'express';
import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     description: Returns users
 */
sessionsRouter.post('/', async (request, response) => {
    const { email, password, google } = request.body;
    const authenticateUser = new AuthenticateUserService();
    const { user, token } = await authenticateUser.execute({
        email,
        password,
        google,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete user.password;
    return response.json({ user, token });
});

export default sessionsRouter;

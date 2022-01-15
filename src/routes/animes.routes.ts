import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import isUuid from '../middlewares/validaUuid';
import RetrieveAllAnimeService from '../service/RetrieveAllAnimeService';
import RetrieveAnimeSeasonService from '../service/RetrieveAnimeSeasonService';
import UpdateAnimeService from '../service/UpdateAnimeService';

const animesRouter = Router();

animesRouter.use(ensureAuthenticated);

animesRouter.get('/', async (request, response) => {
    const userId = request.user.id;
    const retriaveAnimes = new RetrieveAllAnimeService();
    const animes = await retriaveAnimes.execute({ userId });
    return response.json(animes);
});

animesRouter.get('/:id', isUuid, async (request, response) => {
    const userId = request.user.id;
    const { id } = request.params;
    const retriaveAnimes = new RetrieveAllAnimeService();
    const anime = await retriaveAnimes.execute({ id, userId });

    return response.json(anime);
});

animesRouter.get('/:id/seasons', isUuid, async (request, response) => {
    const { id } = request.params;
    const reatrieveAnimeSeason = new RetrieveAnimeSeasonService();
    const seasons = await reatrieveAnimeSeason.execute({ id });

    return response.json(seasons);
});

animesRouter.put('/:id', isUuid, async (request, response) => {
    const { id } = request.params;
    const userId = request.user.id;
    const requestBody = request.body;
    const updateAnime = new UpdateAnimeService();
    await updateAnime.execute({ id, requestBody, userId });
    return response.send();
});

export default animesRouter;

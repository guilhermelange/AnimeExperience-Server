import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import isUuid from '../middlewares/validaUuid';
import RetrieveAllAnimeService from '../service/RetrieveAllAnimeService';

const animesRouter = Router();

animesRouter.use(ensureAuthenticated);

animesRouter.get('/', async (request, response) => {
    const retriaveAnimes = new RetrieveAllAnimeService();
    const animes = await retriaveAnimes.execute({});
    return response.json(animes);
});

animesRouter.get('/:id', isUuid, async (request, response) => {
    const { id } = request.params;
    const retriaveAnimes = new RetrieveAllAnimeService();
    const anime = await retriaveAnimes.execute({ id });

    return response.json(anime);
});

export default animesRouter;

// let { selector } = request.query;
// selector = selector ?? '';
// if (selector.includes('episodes')) {
//     relationsFind.push('seasons.episodes');
//     relationsFind.push('seasons');
// } else if (selector.includes('seasons')) {
//     relationsFind.push('seasons');
// }

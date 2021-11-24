/* eslint-disable no-plusplus */
import { getRepository } from 'typeorm';
import Anime from '../models/Anime';

interface Request {
    id?: string;
}

class RetrieveAllAnimeService {
    public async execute({ id }: Request): Promise<Anime[]> {
        const animesRepository = getRepository(Anime);
        const selectOptions = {
            relations: ['genres', 'authors', 'seasons', 'evaluation'],
        };

        if (id) {
            selectOptions.where = { id };
        }
        let animes = await animesRepository.find(selectOptions);

        animes = animes.map(anime => {
            let total = 0;
            let like = 0;
            // eslint-disable-next-line no-restricted-syntax
            for (const evaluationItem of anime.evaluation) {
                total++;
                if (evaluationItem.evaluation) like++;
            }
            total = total === 0 ? 1 : total;
            like = like === 0 ? 1 : like;
            const media = (like / total) * 100;
            return {
                ...anime,
                seasonsCount: anime.seasons.length,
                evaluation: media,
            };
        });
        return animes;
    }
}

export default RetrieveAllAnimeService;

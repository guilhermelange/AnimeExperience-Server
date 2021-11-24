/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-plusplus */
import { getRepository } from 'typeorm';
import Anime from '../models/Anime';

interface Request {
    id?: string;
}
interface optionsQuery {
    relations: string[];
    where?: {};
}

class RetrieveAllAnimeService {
    public async execute({ id }: Request): Promise<Anime[]> {
        const animesRepository = getRepository(Anime);
        const selectOptions: optionsQuery = {
            relations: ['genres', 'authors', 'seasons', 'evaluation'],
        };

        if (id) {
            selectOptions.where = { id };
        }
        const animes = await animesRepository.find(selectOptions);
        const mappedAnimes = animes.map(animeFor => {
            let total = 0;
            let like = 0;
            // eslint-disable-next-line no-restricted-syntax
            for (const evaluationItem of animeFor.evaluation) {
                total++;
                if (evaluationItem.evaluation) like++;
            }
            total = total === 0 ? 1 : total;
            like = like === 0 ? 1 : like;
            const media = (like / total) * 100;
            return {
                ...animeFor,
                seasonsCount: animeFor.seasons.length,
                evaluationMedia: media,
            };
        });
        return mappedAnimes;
    }
}

export default RetrieveAllAnimeService;

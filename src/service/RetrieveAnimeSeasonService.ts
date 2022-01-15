/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-plusplus */
import { getRepository } from 'typeorm';
import Season from '../models/Season';

interface Request {
    id?: string;
}
interface optionsQuery {
    relations: string[];
    where?: {};
}

class RetrieveAnimeSeason {
    public async execute({ id }: Request): Promise<object[]> {
        const seasonRepository = getRepository(Season);

        const selectOptions: optionsQuery = {
            relations: ['episodes'],
            where: { animeId: id },
        };

        const seasons: Season[] = await seasonRepository.find(selectOptions);
        seasons.forEach(season => {
            delete season.created_at;
            delete season.updated_at;
            delete season.animeId;

            season.episodes.forEach(episode => {
                delete episode.created_at;
                delete episode.updated_at;
                return episode;
            });
            return season;
        });

        return seasons;
    }
}

export default RetrieveAnimeSeason;

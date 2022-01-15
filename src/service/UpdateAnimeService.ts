/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-plusplus */
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Anime from '../models/Anime';
import AnimeUserEvaluation from '../models/AnimeUserEvaluation';
import User from '../models/User';

interface RequestBody {
    favorite?: true;
    evaluation?: true;
}

interface Request {
    id: string;
    requestBody: RequestBody;
    userId: string;
}

interface optionsQuery {
    relations?: string[];
    where?: {};
}

class UpdateAnimeService {
    public async execute({ id, requestBody, userId }: Request): Promise<void> {
        const animeRepository = getRepository(Anime);
        const userRepository = getRepository(User);
        const evaluationRepository = getRepository(AnimeUserEvaluation);
        const { favorite, evaluation } = requestBody;

        const queryOptions: optionsQuery = { where: { id }, relations: [] };

        if (favorite !== undefined) {
            queryOptions.relations?.push('favorites');
        }

        const anime = await animeRepository.findOne(queryOptions);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!anime) {
            throw new AppError('Anime not found.', 400);
        }

        if (!user) {
            throw new AppError('User not found.', 400);
        }

        if (favorite !== undefined) {
            if (favorite) {
                anime.favorites = anime.favorites ?? [];
                anime.favorites.push(user);
            } else {
                anime.favorites = anime.favorites?.filter(
                    userFavorite => userFavorite.id !== userId,
                );
            }
        }

        if (evaluation !== undefined) {
            const newEvaluation = new AnimeUserEvaluation();
            newEvaluation.anime = anime;
            newEvaluation.user = user;
            newEvaluation.evaluation = evaluation;
            await evaluationRepository.save(newEvaluation);
        }

        await animeRepository.save(anime);
    }
}

export default UpdateAnimeService;

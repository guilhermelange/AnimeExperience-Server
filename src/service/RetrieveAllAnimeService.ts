/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-plusplus */
import { getRepository, getManager } from 'typeorm';
import Anime from '../models/Anime';
import AnimeUserEvaluation from '../models/AnimeUserEvaluation';

interface Request {
    id?: string;
    userId?: string;
}
interface optionsQuery {
    relations: string[];
    where?: {};
}

interface AnimeUserFavorites {
    animeId: string;
    userId: string;
}

class RetrieveAllAnimeService {
    public async execute({ id, userId }: Request): Promise<object[]> {
        const animesRepository = getRepository(Anime);
        const entityManager = getManager();
        const favoriteSelect: AnimeUserFavorites[] = await entityManager.query(
            `
            SELECT *
              FROM anime_user_favorites a
             WHERE a."userId" = $1
             LIMIT 1
        `,
            [userId],
        );

        const evaluationRepository = getRepository(AnimeUserEvaluation);
        const evaluations = await evaluationRepository
            .createQueryBuilder('anime_user_evaluation')
            .getRawMany();

        const selectOptions: optionsQuery = {
            relations: ['genres', 'authors', 'seasons'],
        };

        if (id) {
            selectOptions.where = { id };
        }
        const animes = await animesRepository.find(selectOptions);
        const mappedAnimes = animes.map(animeFor => {
            const favorite = favoriteSelect.some(
                item => item.animeId === animeFor.id,
            );
            const seasonsCount = animeFor.seasons ? animeFor.seasons.length : 0;
            let total = 0;
            let like = 0;
            let evaluationUser = null;

            if (evaluations) {
                for (const evaluation of evaluations) {
                    if (
                        evaluation.anime_user_evaluation_animeId === animeFor.id
                    ) {
                        if (
                            evaluation.anime_user_evaluation_userId === userId
                        ) {
                            evaluationUser =
                                evaluation.anime_user_evaluation_evaluation;
                        }
                        total++;
                        if (evaluation.anime_user_evaluation_evaluation) like++;
                    }
                }
            }

            total = total === 0 ? 1 : total;
            like = like === 0 ? 1 : like;
            const media = +((like / total) * 100).toFixed(2);
            console.log(animeFor.name, total, like, media);

            delete animeFor.created_at;
            delete animeFor.updated_at;
            animeFor.genres.map(genre => {
                delete genre.created_at;
                delete genre.updated_at;
                return genre;
            });

            animeFor.authors.map(author => {
                delete author.created_at;
                delete author.updated_at;
                return author;
            });

            delete animeFor.seasons;

            return {
                ...animeFor,
                seasonsCount,
                evaluationMedia: media,
                favorite,
                evaluation: evaluationUser,
            };
        });
        return mappedAnimes;
    }
}

export default RetrieveAllAnimeService;

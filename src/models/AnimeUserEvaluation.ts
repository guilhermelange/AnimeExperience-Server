import { Column, Entity, ManyToOne } from 'typeorm';
import Anime from './Anime';
import User from './User';

@Entity('anime_user_evaluation')
class AnimeUserEvaluation {
    @ManyToOne(() => User, user => user.evaluation, { primary: true })
    public user: User;

    @ManyToOne(() => Anime, anime => anime.evaluation, { primary: true })
    public anime: Anime;

    @Column()
    evaluation: boolean;
}

export default AnimeUserEvaluation;

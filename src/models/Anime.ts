import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import Author from './Author';
import Genre from './Genre';
import Seasons from './Season';
import User from './User';
import Evaluation from './AnimeUserEvaluation';

@Entity('anime')
class Anime {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    cover_file: string;

    @Column()
    image_file: string;

    @Column()
    parental_rating: number;

    @Column('timestamp with time zone')
    start_date: Date;

    @ManyToMany(() => Genre, genre => genre.animes)
    @JoinTable({ name: 'anime_genre' })
    genres: Genre[];

    @ManyToMany(() => Author, author => author.animes)
    @JoinTable({ name: 'anime_author' })
    authors: Author[];

    @ManyToMany(() => User, user => user.animes)
    @JoinTable({ name: 'anime_user_favorites' })
    favorites: User[];

    @OneToMany(() => Evaluation, evaluation => evaluation.anime)
    evaluation: Evaluation[];

    @OneToMany(() => Seasons, season => season.animes)
    seasons: Seasons[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    number_seasons: number;
}

export default Anime;

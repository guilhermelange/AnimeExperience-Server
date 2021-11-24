import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import Anime from './Anime';
import Evaluation from './AnimeUserEvaluation';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Anime, anime => anime.favorites)
    animes: Anime[];

    @OneToMany(() => Evaluation, evaluation => evaluation.user)
    evaluation: Evaluation;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true })
    avatar?: string;
}

export default User;

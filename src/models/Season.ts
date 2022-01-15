import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import Anime from './Anime';
import Episodes from './Episode';

@Entity('season')
class Season {
    @PrimaryColumn()
    number: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @PrimaryColumn('uuid')
    animeId?: string;

    @ManyToOne(() => Anime, anime => anime.seasons, { primary: true })
    @JoinColumn({ name: 'animeId' })
    animes: Anime;

    @OneToMany(() => Episodes, episode => episode.season)
    episodes: Episodes[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}

export default Season;

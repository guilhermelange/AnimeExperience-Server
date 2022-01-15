import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Season from './Season';

@Entity('episode')
class Episode {
    @PrimaryColumn()
    number: string;

    @ManyToOne(() => Season, season => season.episodes, { primary: true })
    @JoinColumn()
    season: Season;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    duration?: number;

    @Column()
    link: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}

export default Episode;

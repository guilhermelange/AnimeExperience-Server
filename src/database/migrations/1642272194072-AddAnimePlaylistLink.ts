import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAnimePlaylistLink1642272194072
    implements MigrationInterface
{
    name = 'AddAnimePlaylistLink1642272194072';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."anime" ADD "playlist_link" character varying DEFAULT ''`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."anime" DROP COLUMN "playlist_link"`,
        );
    }
}

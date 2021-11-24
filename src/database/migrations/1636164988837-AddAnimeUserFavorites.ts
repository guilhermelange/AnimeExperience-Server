import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAnimeUserFavorites1636164988837
    implements MigrationInterface
{
    name = 'AddAnimeUserFavorites1636164988837';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "anime_user_favorites" ("animeId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_3749affe468a7cd78293b744727" PRIMARY KEY ("animeId", "userId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_38ce67fc628f23b5eb0c6c9931" ON "anime_user_favorites" ("animeId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_6f88d8b54a4abd931959a5e516" ON "anime_user_favorites" ("userId") `,
        );
        await queryRunner.query(
            `ALTER TABLE "anime_user_favorites" ADD CONSTRAINT "FK_38ce67fc628f23b5eb0c6c9931e" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "anime_user_favorites" ADD CONSTRAINT "FK_6f88d8b54a4abd931959a5e5167" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "anime_user_favorites" DROP CONSTRAINT "FK_6f88d8b54a4abd931959a5e5167"`,
        );
        await queryRunner.query(
            `ALTER TABLE "anime_user_favorites" DROP CONSTRAINT "FK_38ce67fc628f23b5eb0c6c9931e"`,
        );
        await queryRunner.query(`DROP INDEX "IDX_6f88d8b54a4abd931959a5e516"`);
        await queryRunner.query(`DROP INDEX "IDX_38ce67fc628f23b5eb0c6c9931"`);
        await queryRunner.query(`DROP TABLE "anime_user_favorites"`);
    }
}

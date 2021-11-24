import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAnimeEvaluation1636165587044 implements MigrationInterface {
    name = 'AddAnimeEvaluation1636165587044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "anime_user_evaluation" ("evaluation" boolean NOT NULL, "userId" uuid NOT NULL, "animeId" uuid NOT NULL, CONSTRAINT "PK_2e42d44b049f96a872b7f0632d0" PRIMARY KEY ("userId", "animeId"))`);
        await queryRunner.query(`ALTER TABLE "anime_user_evaluation" ADD CONSTRAINT "FK_2925dd6288bb4c34a0624754048" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime_user_evaluation" ADD CONSTRAINT "FK_9a24a8cfbb9b6d968b3702a7a63" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anime_user_evaluation" DROP CONSTRAINT "FK_9a24a8cfbb9b6d968b3702a7a63"`);
        await queryRunner.query(`ALTER TABLE "anime_user_evaluation" DROP CONSTRAINT "FK_2925dd6288bb4c34a0624754048"`);
        await queryRunner.query(`DROP TABLE "anime_user_evaluation"`);
    }

}

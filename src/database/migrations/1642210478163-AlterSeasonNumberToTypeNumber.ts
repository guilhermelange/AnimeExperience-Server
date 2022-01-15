import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterSeasonNumberToTypeNumber1642210478163
    implements MigrationInterface
{
    name = 'AlterSeasonNumberToTypeNumber1642210478163';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP CONSTRAINT "FK_60040a37b4a497f232575f4f88c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP CONSTRAINT "PK_64b3fb84becf789ba7adca83152"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD CONSTRAINT "PK_711c2bf17cc0e132ff71eabee18" PRIMARY KEY ("number", "seasonAnimeId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP COLUMN "seasonNumber"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD "seasonNumber" integer NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP CONSTRAINT "PK_711c2bf17cc0e132ff71eabee18"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD CONSTRAINT "PK_64b3fb84becf789ba7adca83152" PRIMARY KEY ("number", "seasonAnimeId", "seasonNumber")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" DROP CONSTRAINT "PK_6ccf5d7fb1e61c981b520a249e7"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" ADD CONSTRAINT "PK_d5e55baa63ce35689f34c489e02" PRIMARY KEY ("animeId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" DROP COLUMN "number"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" ADD "number" integer NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" DROP CONSTRAINT "PK_d5e55baa63ce35689f34c489e02"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" ADD CONSTRAINT "PK_6ccf5d7fb1e61c981b520a249e7" PRIMARY KEY ("animeId", "number")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD CONSTRAINT "FK_60040a37b4a497f232575f4f88c" FOREIGN KEY ("seasonNumber", "seasonAnimeId") REFERENCES "season"("number","animeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP CONSTRAINT "FK_60040a37b4a497f232575f4f88c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" DROP CONSTRAINT "PK_6ccf5d7fb1e61c981b520a249e7"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" ADD CONSTRAINT "PK_d5e55baa63ce35689f34c489e02" PRIMARY KEY ("animeId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" DROP COLUMN "number"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" ADD "number" character varying NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" DROP CONSTRAINT "PK_d5e55baa63ce35689f34c489e02"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."season" ADD CONSTRAINT "PK_6ccf5d7fb1e61c981b520a249e7" PRIMARY KEY ("number", "animeId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP CONSTRAINT "PK_64b3fb84becf789ba7adca83152"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD CONSTRAINT "PK_711c2bf17cc0e132ff71eabee18" PRIMARY KEY ("number", "seasonAnimeId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP COLUMN "seasonNumber"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD "seasonNumber" character varying NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" DROP CONSTRAINT "PK_711c2bf17cc0e132ff71eabee18"`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD CONSTRAINT "PK_64b3fb84becf789ba7adca83152" PRIMARY KEY ("number", "seasonNumber", "seasonAnimeId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "public"."episode" ADD CONSTRAINT "FK_60040a37b4a497f232575f4f88c" FOREIGN KEY ("seasonAnimeId", "seasonNumber") REFERENCES "season"("animeId","number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}

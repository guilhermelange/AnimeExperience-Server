import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultDB1636163091545 implements MigrationInterface {
    name = 'DefaultDB1636163091545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "episode" ("number" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, "link" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "seasonNumber" character varying NOT NULL, "seasonAnimeId" uuid NOT NULL, CONSTRAINT "PK_64b3fb84becf789ba7adca83152" PRIMARY KEY ("number", "seasonNumber", "seasonAnimeId"))`);
        await queryRunner.query(`CREATE TABLE "season" ("number" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "animeId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6ccf5d7fb1e61c981b520a249e7" PRIMARY KEY ("number", "animeId"))`);
        await queryRunner.query(`CREATE TABLE "anime" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "cover_file" character varying NOT NULL, "parental_rating" integer NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e567f73ed63fd388a7734cbdd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "avatar" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anime_genre" ("animeId" uuid NOT NULL, "genreId" uuid NOT NULL, CONSTRAINT "PK_74a864bf5a767df14c08996a1de" PRIMARY KEY ("animeId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae51419fff8f714bac91a0ec8b" ON "anime_genre" ("animeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8cadbe166d0a7f5e89c6e50543" ON "anime_genre" ("genreId") `);
        await queryRunner.query(`CREATE TABLE "anime_author" ("animeId" uuid NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_31f88135b39a331e7ebf789d86c" PRIMARY KEY ("animeId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d181a6cd1d541faf86af50462" ON "anime_author" ("animeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e2d105f467cec8a31786f02ec3" ON "anime_author" ("authorId") `);
        await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_60040a37b4a497f232575f4f88c" FOREIGN KEY ("seasonNumber", "seasonAnimeId") REFERENCES "season"("number","animeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_d5e55baa63ce35689f34c489e02" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime_genre" ADD CONSTRAINT "FK_ae51419fff8f714bac91a0ec8b2" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "anime_genre" ADD CONSTRAINT "FK_8cadbe166d0a7f5e89c6e505439" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anime_author" ADD CONSTRAINT "FK_4d181a6cd1d541faf86af504625" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "anime_author" ADD CONSTRAINT "FK_e2d105f467cec8a31786f02ec35" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anime_author" DROP CONSTRAINT "FK_e2d105f467cec8a31786f02ec35"`);
        await queryRunner.query(`ALTER TABLE "anime_author" DROP CONSTRAINT "FK_4d181a6cd1d541faf86af504625"`);
        await queryRunner.query(`ALTER TABLE "anime_genre" DROP CONSTRAINT "FK_8cadbe166d0a7f5e89c6e505439"`);
        await queryRunner.query(`ALTER TABLE "anime_genre" DROP CONSTRAINT "FK_ae51419fff8f714bac91a0ec8b2"`);
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_d5e55baa63ce35689f34c489e02"`);
        await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT "FK_60040a37b4a497f232575f4f88c"`);
        await queryRunner.query(`DROP INDEX "IDX_e2d105f467cec8a31786f02ec3"`);
        await queryRunner.query(`DROP INDEX "IDX_4d181a6cd1d541faf86af50462"`);
        await queryRunner.query(`DROP TABLE "anime_author"`);
        await queryRunner.query(`DROP INDEX "IDX_8cadbe166d0a7f5e89c6e50543"`);
        await queryRunner.query(`DROP INDEX "IDX_ae51419fff8f714bac91a0ec8b"`);
        await queryRunner.query(`DROP TABLE "anime_genre"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "anime"`);
        await queryRunner.query(`DROP TABLE "season"`);
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageFileRemoveNull1636223047590 implements MigrationInterface {
    name = 'ImageFileRemoveNull1636223047590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."anime" ALTER COLUMN "image_file" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."anime" ALTER COLUMN "image_file" DROP NOT NULL`);
    }

}

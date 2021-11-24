import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddedImageFileToAnime1636222960213
    implements MigrationInterface
{
    name = 'AddedImageFileToAnime1636222960213';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."anime" ADD "image_file" character varying`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."anime" DROP COLUMN "image_file"`,
        );
    }
}

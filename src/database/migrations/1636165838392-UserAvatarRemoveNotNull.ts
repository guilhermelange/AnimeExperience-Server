import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UserAvatarRemoveNotNull1636165838392
    implements MigrationInterface
{
    name = 'UserAvatarRemoveNotNull1636165838392';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."user" ALTER COLUMN "avatar" DROP NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."user" ALTER COLUMN "avatar" SET NOT NULL`,
        );
    }
}

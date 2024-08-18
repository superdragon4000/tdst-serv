import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1724005822503 implements MigrationInterface {
    name = 'AddUserTable1724005822503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('admin', 'editor', 'active', 'suspended', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."user_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "userId"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitAnswers1730513688145 implements MigrationInterface {
    name = 'InitAnswers1730513688145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "question_id" uuid NOT NULL, "is_left" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f4cf663ebeca05b7a12f6a2cc97" UNIQUE ("user_id"), CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "answers"`);
    }

}

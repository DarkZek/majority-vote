import { MigrationInterface, QueryRunner } from "typeorm"

export class initalQuestion1730503748432 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE public.questions (
                "statement" varchar NULL,
                id varchar NULL,
                left_option varchar NULL,
                right_option varchar NULL,
                created_at date NULL,
                updated_at date NULL
            );
            `,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE public.questions')
    }
}
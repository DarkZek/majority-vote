import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: "answers" })
export class Answer {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: 'user_id', type: "uuid", unique: true })
    userId!: string;

    @Column({ name: 'question_id', type: "uuid" })
    questionId!: string;

    @Column({ name: 'is_left', type: "boolean" })
    isLeft!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
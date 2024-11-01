import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "questions" })
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 500 })
    statement!: string;

    @Column({ name: 'left_option', type: "varchar", length: 100})
    leftOption!: string;

    @Column({ name: 'right_option', type: "varchar", length: 100 })
    rightOption!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
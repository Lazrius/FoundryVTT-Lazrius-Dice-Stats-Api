import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Roll } from "./Roll";

@Entity()
export class Dice {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	diceNumber: number;

	@Column()
	diceOutcome: number;

	@ManyToOne(() => Roll, roll => roll.dice)
	@JoinColumn({ name: 'rollId', referencedColumnName: 'chatMessageId' })
	roll: Roll;

	@Column()
	rollId: string;
}


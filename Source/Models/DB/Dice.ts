import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
	roll: Roll;
}

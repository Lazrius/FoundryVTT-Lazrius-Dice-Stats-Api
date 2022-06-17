import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Roll } from "./Roll";

@Entity()
export class Dice {
	@PrimaryColumn()
	id: string;

	@Column()
	diceNumber: number;

	@Column()
	diceOutcome: number;

	@ManyToOne(() => Roll, roll => roll.dice)
	roll: Roll;
}

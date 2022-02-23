import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Roll } from "./Roll";
import AbstractEntity from "../../AbstractEntity";

@Entity()
export class Dice extends AbstractEntity {
	@PrimaryColumn()
	id: string;

	@Column()
	created: number;

	@Column()
	diceNumber: number;

	@Column()
	diceModifier: number;

	@Column()
	diceOutcome: number;

	@ManyToOne(() => Roll, roll => roll.dice)
	roll: Roll;
}

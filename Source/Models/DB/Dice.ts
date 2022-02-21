import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Roll } from "./Roll";

@Entity()
export class Dice extends BaseEntity {
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

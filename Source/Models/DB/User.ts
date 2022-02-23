import { Roll } from './Roll';
import { Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { PartyMember } from "./PartyMember";
import AbstractEntity from "../../AbstractEntity";

@Entity()
export class User extends AbstractEntity {
	@PrimaryColumn()
	@Index()
	id: string; // UserId, Foundry Binding

	@Column()
	created: number;

	@Column()
	name: string;

	@OneToMany(() => PartyMember, member => member.owner)
	partyMembers: PartyMember[];

	@OneToMany(() => Roll, dice => dice.user)
	allDice: Roll[];
}

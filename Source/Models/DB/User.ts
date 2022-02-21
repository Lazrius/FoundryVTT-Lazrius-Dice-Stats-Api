import { Roll } from './Roll';
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { PartyMember } from "./PartyMember";

@Entity()
export class User extends BaseEntity {
	@PrimaryColumn()
	id: string;

	@Column()
	created: number;

	@Index()
	@Column()
	userId: string;

	@Column()
	name: string;

	@OneToMany(() => PartyMember, member => member.owner)
	partyMembers: PartyMember[];

	@OneToMany(() => Roll, dice => dice.user)
	allDice: Roll[];
}

import { Roll } from './Roll';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";
import AbstractEntity from "../../AbstractEntity";

@Entity()
export class PartyMember extends AbstractEntity {
	@PrimaryColumn()
	@Index()
	id: string; // ActorId, Foundry Binding

	@Column()
	created: number;

	@Column()
	name: string;

	@ManyToOne(() => User, owner => owner.partyMembers)
	owner: User;

	@OneToMany(() => Roll, dice => dice.partyMember)
	rolls: Roll[];
}

import { Roll } from './Roll';
import { BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class PartyMember extends BaseEntity {
	@PrimaryColumn()
	id: string;

	@Column()
	created: number;

	@Column()
	@Index()
	actorId: string;

	@Column()
	name: string;

	@ManyToOne(() => User, owner => owner.partyMembers)
	owner: User;

	@OneToMany(() => Roll, dice => dice.partyMember)
	rolls: Roll[];
}

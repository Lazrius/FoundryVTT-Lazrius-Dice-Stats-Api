import { Roll } from './Roll';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class PartyMember {
	@PrimaryColumn()
	@Index()
	id: string; // ActorId, Foundry Binding

	@Column()
	created: number;

	@Column()
	name: string;

	@ManyToOne(() => User, owner => owner.partyMembers)
	owner: User;

	@OneToMany(() => Roll, dice => dice.partyMember, {
		cascade: true,
	})
	rolls: Promise<Roll[]>;
}

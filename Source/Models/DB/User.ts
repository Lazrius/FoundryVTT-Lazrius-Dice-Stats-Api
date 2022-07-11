import { Roll } from './Roll';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PartyMember } from "./PartyMember";
import { World } from "./World";

@Entity()
export class User {
	@PrimaryColumn()
	@Index()
	id: string; // UserId, Foundry Binding

	@Column()
	isDm: boolean;

	@Column()
	created: number;

	@Column()
	name: string;

	@OneToMany(() => PartyMember, member => member.owner, {
		cascade: true,
	})
	partyMembers: PartyMember[];

	@OneToMany(() => Roll, dice => dice.user, {
		cascade: true,
	})
	rolls: Promise<Roll[]>;

	@ManyToOne(() => World, world => world.users)
	world: World;
}

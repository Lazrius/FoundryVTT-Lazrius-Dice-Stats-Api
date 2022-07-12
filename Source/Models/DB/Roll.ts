import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PartyMember } from "./PartyMember";
import { User } from "./User";
import { Dice } from "./Dice";
import { Session } from "./Session";

@Entity()
export class Roll {
	@PrimaryColumn()
	id: string;

	@Column()
	created: number;

	@Index()
	@Column()
	flavour: string;

	@Column()
	formula: string;

	@Column()
	result: number;

	@ManyToOne(() => Session, session => session.rolls)
	session: Promise<Session>;

	@ManyToOne(() => PartyMember, member => member.rolls)
	partyMember: PartyMember;

	@ManyToOne(() => User, user => user.rolls)
	user: User;

	@OneToMany(() => Dice, dice => dice.roll, {
		cascade: true,
	})
	dice: Promise<Dice[]>;
}

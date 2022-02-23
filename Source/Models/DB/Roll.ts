import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PartyMember } from "./PartyMember";
import { User } from "./User";
import { Dice } from "./Dice";
import AbstractEntity from "../../AbstractEntity";

export enum Ability {
	None = "N/A",
	Str = "Strength",
	Dex = "Dexterity",
	Con = "Consitution",
	Int = "Intelligence",
	Wis = "Wisdom",
	Cha = "Charisma"
}

export enum Skill {
	None = "N/A",
	Acr = "Acrobatics",
	Ani = "Animal Handling",
	Arc = "Arcana",
	Ath = "Athletics",
	Dec = "Deception",
	His = "History",
	Ins = "Insight",
	Inv = "Investigation",
	Itm = "Intimidation",
	Med = "Medicine",
	Nat = "Nature",
	Per = "Perception",
	Prc = "Persuasion",
	Prf = "Performance",
	Rel = "Religion",
	Slt = "Sleight of Hand",
	Ste = "Stealth",
	Sur = "Survival",
}

@Entity()
export class Roll extends AbstractEntity {
	@PrimaryColumn()
	id: string;

	@Column()
	created: number;

	@OneToMany(() => Dice, dice => dice.roll)
	dice: Dice;

	@Index()
	@Column()
	ability: Ability;

	@Index()
	@Column()
	skill: Skill;

	@ManyToOne(() => PartyMember, member => member.rolls)
	partyMember: PartyMember;

	@ManyToOne(() => User, user => user.allDice)
	user: User;
}

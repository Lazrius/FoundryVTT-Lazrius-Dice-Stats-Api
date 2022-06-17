import { Column, Entity, Index, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class World {
	@PrimaryColumn()
	@Index()
	id: string; // WorldId, Foundry Binding

	@Column()
	created: number;

	@Column()
	name: string;

	@Column()
	system: string;

	@OneToMany(() => User, user => user.world)
	users: User[];
}

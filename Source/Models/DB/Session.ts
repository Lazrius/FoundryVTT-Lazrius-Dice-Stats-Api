import { Roll } from './Roll';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	started: number;

	@Column()
	finished: number;

	@OneToMany(() => Roll, roll => roll.session)
	rolls: Promise<Roll[]>;
}

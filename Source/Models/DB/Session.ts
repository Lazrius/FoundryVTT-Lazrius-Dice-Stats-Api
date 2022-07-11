import { Roll } from './Roll';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	started: number;

	@Column({ nullable: true })
	finished: number;

	@OneToMany(() => Roll, roll => roll.session, {
		cascade: true,
	})
	rolls: Promise<Roll[]>;
}

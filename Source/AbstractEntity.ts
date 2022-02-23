import { BaseEntity } from "typeorm";
import { instanceToPlain } from "class-transformer";

export default abstract class AbstractEntity extends BaseEntity {
	toJson(): Record<string, unknown> {
		return instanceToPlain(this);
	}
}

import { IsNotEmpty, IsString } from "class-validator";

export default class NewWorldRequest {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	worldId: string;

	@IsString()
	@IsNotEmpty()
	system: string;
}

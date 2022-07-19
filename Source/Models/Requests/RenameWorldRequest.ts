import { IsNotEmpty, IsString } from "class-validator";

export default class RenameWorldRequest {
	@IsString()
	@IsNotEmpty()
	worldId: string;

	@IsString()
	@IsNotEmpty()
	newWorldName: string;
}

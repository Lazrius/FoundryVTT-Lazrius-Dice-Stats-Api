import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export default class NewUserRequest {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsBoolean()
	isDm: boolean;
}

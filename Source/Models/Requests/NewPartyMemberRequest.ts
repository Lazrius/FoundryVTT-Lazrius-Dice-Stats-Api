import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class NewPartyMemberRequest {
	@IsString()
	@IsNotEmpty()
	partyMemberId: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsBoolean()
	alive: boolean;
}

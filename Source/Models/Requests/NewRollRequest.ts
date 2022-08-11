import NewDiceRequest from "./NewDiceRequest";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export default class NewRollRequest {
	@IsString()
	@IsNotEmpty()
	formula: string;

	@IsNumber()
	@IsNotEmpty()
	total: number;

	@IsString()
	@IsNotEmpty()
	partyMember: string;

	@IsString()
	@IsNotEmpty()
	user: string;

	@Type(() => NewDiceRequest)
	@ValidateNested({ each: true })
	dice: NewDiceRequest[];

	@IsString()
	@IsNotEmpty()
	chatMessageId: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	flavour: string | undefined;
}

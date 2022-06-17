import NewDiceRequest from "./NewDiceRequest";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export default class NewRollRequest {
	@IsString()
	@IsNotEmpty()
	id: string;

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

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	skill: string | undefined;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	ability: string | undefined;
}

import NewDiceRequest from "./NewDiceRequest";
import { IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export default class NewRollRequest {
	@IsString()
	id: string;

	@IsString()
	formula: string;

	@IsNumber()
	total: number;

	@IsString()
	partyMember: string;

	@IsString()
	user: string;

	@Type(() => NewDiceRequest)
	@ValidateNested({ each: true })
	dice: NewDiceRequest[];

	@IsOptional()
	@IsString()
	skill: string | undefined;

	@IsOptional()
	@IsString()
	ability: string | undefined;
}

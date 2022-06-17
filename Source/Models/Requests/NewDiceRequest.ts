import { IsIn, IsNumber } from "class-validator";
import { AllowedDice } from "../Validator";

export default class NewDiceRequest {
	@IsNumber()
	@IsIn(AllowedDice)
	diceNumber: number;

	@IsNumber()
	@IsIn(AllowedDice)
	diceOutcome: number;
}

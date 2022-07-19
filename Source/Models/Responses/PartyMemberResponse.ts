import { HttpResponse } from "./HttpResponse";
import { UserResponse } from "./UserResponse";

export interface PartyMemberResponse extends HttpResponse {
	id: string;
	created: number;
	name: string;
	owner: UserResponse;
	alive: boolean;
}

import { HttpResponse } from "./HttpResponse";
import { WorldResponse } from "./WorldResponse";
import { PartyMemberResponse } from "./PartyMemberResponse";

export interface UserResponse extends HttpResponse {
	id: string;
	isDm: boolean;
	created: number;
	name: string;
	world: WorldResponse
	partyMembers: PartyMemberResponse[]
}

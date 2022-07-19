import { HttpResponse } from "./HttpResponse";

export interface SimplePartyMember {
	id: string,
	userId: string,
	name: string,
	created: number,
	alive: boolean,
}

export interface AllPartyMembersResponse extends HttpResponse {
	members: SimplePartyMember[];
}

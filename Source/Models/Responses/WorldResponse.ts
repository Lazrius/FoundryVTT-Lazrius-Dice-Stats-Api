import { HttpResponse } from "./HttpResponse";

export interface WorldResponse extends HttpResponse {
	id: string;
	created: number;
	name: string;
	system: string;
}

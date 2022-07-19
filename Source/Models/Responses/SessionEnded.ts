import { HttpResponse } from "./HttpResponse";

export interface SessionEnded extends HttpResponse {
	id: number;
	started: number;
	finished?: number;
}

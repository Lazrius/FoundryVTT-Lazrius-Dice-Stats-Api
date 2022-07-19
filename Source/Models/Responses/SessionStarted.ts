import { HttpResponse } from "./HttpResponse";

export interface SessionStarted extends HttpResponse {
	id: number;
	started: number;
	finished?: number;
}

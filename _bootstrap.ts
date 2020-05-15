// std
import { ServerRequest } from "https://deno.land/std@0.50.0/http/server.ts";

// routes
import { routes } from './app/routes.ts';
import { routing } from './_routing.ts';

export function bootstrap(req: ServerRequest) {
	routing(req, routes);	
}
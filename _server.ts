// std
import { serve, HTTPOptions } from "https://deno.land/std@0.50.0/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

// global vars
const { args } = Deno;

// local module
import { bootstrap } from './_bootstrap.ts';

interface ServerArgs {
	_: string[];
	p: number; // -p
	port: number; // --port
	h: boolean; // -h 
	help: boolean; // --help
}

const serverArgs = parse(args) as ServerArgs;

/**
 * Server instance
 */

export async function server(args: ServerArgs = serverArgs): Promise<void> {
	// server instance config
	const serverConfig: HTTPOptions = {
		// server port
		port: args.port ?? args.p ?? 3000,
	}

	// declare server
	const server = serve(serverConfig);
	// show the message
	console.log(`Your site is ready at http://localhost:${serverConfig.port}`);

	// server incoming request
	for await (const req of server) {
		bootstrap(req);	
	}
}
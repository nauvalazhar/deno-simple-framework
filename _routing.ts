// std
import { ServerRequest, Response as ServerResponse } from "https://deno.land/std@0.50.0/http/server.ts";
import { posix } from "https://deno.land/std/path/mod.ts";

// global vars
const { open, exit, File } = Deno;

// interfaces
import { BaseController } from './_base_controller.ts';

export interface Constructable<T> {
	new (...args: any): T;
}

export type Route = {
	controller: Constructable<BaseController>;
}

export type Routes = {
	[key: string]: Route
}

/**
 * Get output from file, string or object
 * @param  {string}       render
 * @return {Promise<any>}
 */
function getRenderOutput(render: any): Promise<any> {
	return new Promise(resolve => {

		// if the render method return js object
		if(typeof render == 'object') {
			// stringify the js object
			return resolve(JSON.stringify(render));

		// if the render method return 'views.*'
		}else if((/^views\./gi).test(render)) {
			// split `views.*`
			const path = render.split('views.');

			// define viewPath or target view file
			const viewPath = './app/views/' + path[1] + '.html';

			// open the `viewpath` file
			const file = open(viewPath);

			return resolve(file);
		}

		// otherwise return render method
		return resolve(render);
	});
}

/**
 * Handle current route with current controller
 * @param  {Route}           route Current route
 * @return {Promise<Object>}       ResponseResponse
 */
function controllerAsHandler(route: Route): Promise<ServerResponse> {
	const { controller } = route;

	// init the controller
	const controllerInstance = new controller;

	return new Promise(resolve => {
		// declare headers
		const headers = new Headers();
		// set http header with the value from the controller's `contentType` property
		headers.set('content-type', controllerInstance.contentType);

		// get final render output
		getRenderOutput(controllerInstance.render())
		.then(render => {

			// return ServerResponse
			return resolve({
				headers,
				body: render
			});
		});
	});

}

export function routing(req: ServerRequest, routes: Routes) {
	// create server object
	const serverObject: {
		pathname: string;
	} = {
		pathname: posix.normalize(req.url) // get pathname from request URL property
	}

	// destruct pathname from `serverObject`
	const { pathname } = serverObject;

	// check if route path is exists
	if(pathname in routes) {
		// get current route by `pathname`
		const currentRoute = routes[pathname];

		if(!('controller' in currentRoute)) {
			// please provide controller in your `pathname` route
			// exit
		}

		// if `currentRoute` is `healthy`
		// then serve the route (respond)

		// use route controller as route handler
		const response = controllerAsHandler(currentRoute);

		// send http response
		response.then(res => {
			// respond!
			req.respond(res);
		}).catch(err => {
			console.log(err);
		});
	}else{
		// route not found
		// send exception

		req.respond({
			body: '<h1>404</h1>'
		});
	}
}
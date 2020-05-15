# deno-simple-framework
This is my simple experiment with Deno and Typescript. I made a simple framework, in which there are routes, controllers and views. This is just for studying.

## Install
1. Make sure you have Deno installed on your machine
2. Clone this repo
3. Run: `cd deno-simple-framework`
4. Run: `deno run --allow-net --allow-read main.ts`
5. Open `http://localhost:8000` in your browser
6. Done

## Flow
The way this framework works is simple:
1. The main.js file will run
2. In the file there is an HTTP server built on top of the `serve` module (_bootstrap.ts, _server.ts)
3. The app will start the routing system (_routing.ts)
4. The routing system will read the `app/routes.ts` file
5. When the user makes a request, the routing system will read the request and look for a match route in the `app/routes.ts` file
6. Then the matching route will be used
7. Each route has a controller
8. The controller will be used to handle user requests
9. Each controller has a `contentType` property and also the `render` method
10. The `contentType` property is used for HTTP header responses, while `render` is used as HTTP body
11. The server will return an HTTP response

## Routes
There are currently 3 routes:
- / (index page)
- /about (about page)
- Json (return JSON)

```
// controllers
import IndexController from './controllers/IndexController.ts';
import AboutController from './controllers/AboutController.ts';
import JsonController from './controllers/JsonController.ts';

// local module
import { Route, Routes } from './../_routing.ts';

export const routes: Routes = {
	'/': {
		controller: IndexController
	},
	'/about': {
		controller: AboutController
	},
	'/json': {
		controller: JsonController
	},
  // your own route here
}
```

## Controller
Each route requires a controller.

### Example 1
This controller will return the HTML string. If your controller has a `text/html` content type, then you don't need to declare it again, because that's the default.
```
import { BaseController } from './../../_base_controller.ts';

export default class IndexController extends BaseController {
	render(): string {
		return `<p>Hello</p>`;
	}
}
```

### Example 2
This controller will return the name of the view file. The file used by this controller is in `app/views/*`. The routing system will automatically take the contents of the view file and use it as an HTTP body.
```
import { BaseController } from './../../_base_controller.ts';

export default class AboutController extends BaseController {
	render(): string {
		return `views.about`;
	}
}
```

### Example 3
This controller will return JSON. The routing system uses `JSON.stringify` before the object is used as an HTTP body.

```
import { BaseController } from './../../_base_controller.ts';

export default class JsonController extends BaseController {
	contentType = 'application/json';

	render(): object {
		return {
			user: 'Nauval'
		};
	}
}
```

## Standard Library Used
- https://deno.land/std@0.50.0/http/server.ts
- https://deno.land/std/flags/mod.ts
- https://deno.land/std/path/mod.ts

## Thank you!

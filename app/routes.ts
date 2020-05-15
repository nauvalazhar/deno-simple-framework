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
	}
}
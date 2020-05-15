import { BaseController } from './../../_base_controller.ts';

export default class JsonController extends BaseController {
	contentType = 'application/json';

	render(): object {
		return {
			user: 'Nauval'
		};
	}
}
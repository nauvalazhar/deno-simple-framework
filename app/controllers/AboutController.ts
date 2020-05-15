import { BaseController } from './../../_base_controller.ts';

export default class AboutController extends BaseController {
	render(): string {
		return `views.about`;
	}
}
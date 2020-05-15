import { BaseController } from './../../_base_controller.ts';

/**
 * Simple index controller with string view
 */
export default class IndexController extends BaseController {
	render(): string {
		return `
		<!DOCTYPE html>
		<html>
			<body>
				<h1>Index page</h1>
				<p>Hello, this is the index page. This paragraph is written inside the controller.</p>

				<p><b>Sitemap</b></p>
				<ul>
					<li><a href="/">Index Page</a></li>
					<li><a href="/about">About Page</a></li>
					<li><a href="/json">Example JSON Response</a></li>
				</ul>
			</body>
		</html>`;
	}
}
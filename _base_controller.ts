export abstract class BaseController {
	abstract render(): string | object;

	contentType: string = 'text/html';
}
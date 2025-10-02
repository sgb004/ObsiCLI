/**
 * @name ObsiCLI
 * @description A command line simulator for JavaScript programs as programming challenges. This simulator is intended as a means to print output and input.
 * @author sgb004
 * @version 2.0.0
 */

class ObsiCLI extends HTMLElement {
	#outputElement;
	#inputElement;
	#inCallbacks;

	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
			<div class="screen">
				<div class="output">
				</div>
				<form class="input" action="#">
					<input type="text" value="" />
					<input type="submit" value="" />
				</form>
			</div>
		`;

		this.#outputElement = this.querySelector('.output');
		this.#inputElement = this.querySelector('form.input input[type="text"]');
		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
		this.#addListeners();

		requestAnimationFrame(() => {
			this.dispatchEvent(new CustomEvent('ready'));
		});
	}

	#addListeners() {
		const form = this.querySelector('.input');
		if (form instanceof HTMLFormElement) {
			form.addEventListener('submit', this.#handleInputSubmit.bind(this));
		}

		this.addEventListener('click', this.#handleClick.bind(this));
		this.#inputElement.addEventListener('input', (event) => event.stopPropagation());
	}

	#dispatchEvent(name, detail = {}) {
		const event = new CustomEvent(name, { detail });
		this.dispatchEvent(event);
	}

	#handleInputSubmit(event) {
		event.preventDefault();

		this.out(this.#inputElement.value);
		this.#inCallbacks.resolve(this.#inputElement.value);
		this.#dispatchEvent('input', this.#inputElement.value);
		event.currentTarget.reset();

		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
	}

	#handleClick() {
		requestAnimationFrame(() => {
			const selection = window.getSelection();
			let textSelected = false;

			if (!selection.isCollapsed) {
				const parent = selection.anchorNode.parentNode.closest('obsi-cli');

				if (parent === this) {
					textSelected = true;
				}
			}

			if (!textSelected) {
				this.#inputElement.focus();
			}
		});
	}

	out(message, type = '') {
		const line = document.createElement('pre');
		const types = ['error', 'warning', 'warn', 'success', 'info', 'debug'];

		if (types.includes(type)) {
			line.classList.add(type);
		}
		line.textContent = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;

		this.#outputElement.appendChild(line);

		this.scrollTo(0, this.scrollHeight);
	}

	outError(message) {
		this.out(message, 'error');
	}

	outWarning(message) {
		this.out(message, 'warning');
	}

	outWarn(message) {
		this.outWarning(message);
	}

	outSuccess(message) {
		this.out(message, 'success');
	}

	outInfo(message) {
		this.out(message, 'info');
	}

	outDebug(message) {
		this.out(message, 'debug');
	}

	in(message) {
		if (message) {
			this.out(message);
		}

		return new Promise((resolve, reject) => {
			this.#inCallbacks = {
				resolve,
				reject,
			};
		});
	}

	open(message) {
		const msg =
			message == undefined || message == null ? '\nObsiCLI was opened correctly.' : message;

		this.out(msg);
		this.#inputElement.removeAttribute('disabled');
		this.#inputElement.focus();

		this.#dispatchEvent('opened');
	}

	close(message) {
		const msg =
			message == undefined || message == null ? '\nObsiCLI was closed correctly.' : message;

		this.out(msg);
		this.#inputElement.setAttribute('disabled', 'disabled');
		this.#inputElement.value = '';

		this.#dispatchEvent('closed');
	}

	clear() {
		this.#outputElement.innerHTML = '';
		this.#inputElement.value = '';
		this.#inputElement.focus();
	}
}

customElements.define('obsi-cli', ObsiCLI);

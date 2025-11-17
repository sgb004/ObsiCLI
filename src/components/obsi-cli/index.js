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
				<textarea class="input" rows="1"></textarea>
			</div>
		`;

		this.#outputElement = this.querySelector('.output');
		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
		this.#inputElement = this.querySelector('.input');
		this.#addListeners();

		console.log(this.#inputElement);

		requestAnimationFrame(() => {
			this.dispatchEvent(new CustomEvent('ready'));
		});
	}

	#addListeners() {
		this.addEventListener('click', this.#handleClick.bind(this));

		this.#inputElement.addEventListener('keydown', this.#handleInputKeydown.bind(this));
		this.#inputElement.addEventListener('paste', this.#handleInputPaste.bind(this));
		this.#inputElement.addEventListener('input', this.#handleInputInput.bind(this));
	}

	#dispatchEvent(name, detail = {}) {
		const event = new CustomEvent(name, { detail });
		this.dispatchEvent(event);
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

	#handleInputKeydown(event) {
		if (event.key === 'Enter') {
			event.preventDefault();

			this.#enterInput();
		}
	}

	#handleInputPaste(event) {
		const text = (event.clipboardData || window.clipboardData).getData('text');
		this.#resizeTextarea(text);
	}

	#handleInputInput(event) {
		this.#resizeTextarea(event.target.value);
	}

	#resizeTextarea(value) {
		const breakLines = (value.match(/\r\n|\r|\n/g) || []).length;
		this.#inputElement.setAttribute('rows', breakLines + 1);
	}

	#enterInput() {
		const inputValue = this.#inputElement.value;

		this.out(inputValue);
		this.#inCallbacks.resolve(inputValue);
		this.#dispatchEvent('input', inputValue);
		this.#inputElement.value = '';
		this.#inputElement.setAttribute('rows', 1);

		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
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

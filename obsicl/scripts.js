class ObsiCL extends HTMLElement {
	#output;
	#inCallbacks;

	constructor() {
		super();

		this.innerHTML = `
			<div class="screen">
				<div class="output">
				</div>
				<form class="input">
					<input type="text" value="" />
					<input type="submit" value="" />
				</form>
			</div>
		`;

		this.#output = this.querySelector('.output');
		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
		this.#addListeners();
	}

	#addListeners() {
		const form = this.querySelector('.input');
		if (form instanceof HTMLFormElement) {
			form.addEventListener('submit', this.#handleInputSubmit.bind(this));
		}
	}

	#handleInputSubmit(event) {
		event.preventDefault();

		const input = event.currentTarget.querySelector('input[type="text"]');

		if (input instanceof HTMLInputElement) {
			this.ou(input.value);
			this.#inCallbacks.resolve(input.value);
			event.currentTarget.reset();
		} else {
			this.#inCallbacks.reject(input.value);
		}

		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
	}

	ou(message) {
		const line = document.createElement('pre');
		line.textContent = message;

		this.#output.appendChild(line);
	}

	in() {
		const cl = this;
		return new Promise((resolve, reject) => {
			this.#inCallbacks = {
				resolve,
				reject,
			};
		});
	}
}

customElements.define('obsi-cl', ObsiCL);

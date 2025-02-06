class ObsiCL extends HTMLElement {
	#output;
	#inputElement;
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
		this.#inputElement = this.querySelector('form.input input[type="text"]');
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
		
		this.addEventListener('click', this.#handleClick.bind(this));
	}

	#handleInputSubmit(event) {
		event.preventDefault();
		
		this.ou(this.#inputElement.value);
		this.#inCallbacks.resolve(this.#inputElement.value);
		event.currentTarget.reset();

		this.#inCallbacks = {
			resolve: () => {},
			reject: () => {},
		};
	}
	
	#handleClick(){
	  this.#inputElement.focus();
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

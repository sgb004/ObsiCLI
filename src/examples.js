(() => {
	/**
	 * Example calculator
	 * This is a simple calculator that can be used to test the ObsiCLI component.
	 * Written by: sgb004
	 * Date: 2025-01-26
	 * Version: 1.0.0
	 */
	async function exampleCalculator() {
		const terminal = document.getElementById('terminal');
		let mustContinue = true;
		let accumulator = 0,
			number = 0;
		let operator = '';
		let terminalIn;

		terminal.addEventListener('ready', () => {
			console.log('The terminal is ready.');
		});

		terminal.addEventListener('opened', () => {
			console.log('The terminal is opened.');
		});

		terminal.addEventListener('closed', () => {
			console.log('The terminal is closed.');
		});

		terminal.out('Welcome.\nThis program is a calculator.\n');

		do {
			terminalIn = await terminal.in('\nEnter a number:');
			accumulator = parseFloat(terminalIn);

			if (accumulator >= -200000 && accumulator <= 200000) {
				mustContinue = true;
			} else {
				terminal.outWarning('The number must be in a range of -200000 and 200000\n');
				mustContinue = false;
			}
		} while (!mustContinue);

		do {
			do {
				terminal.out('\nEnter an operator:');
				operator = await terminal.in();

				if (
					operator !== '+' &&
					operator !== '-' &&
					operator !== '*' &&
					operator !== '/' &&
					operator !== '='
				) {
					terminal.outWarn('The operator must be + - * / =\n');
					mustContinue = false;
				} else {
					mustContinue = true;
				}
			} while (!mustContinue);

			if (operator === '=') {
				mustContinue = false;
			} else {
				do {
					terminal.out('\nEnter a number:');

					terminalIn = await terminal.in();
					number = parseFloat(terminalIn);

					if (number >= -200000 && number <= 200000) {
						mustContinue = true;
					} else {
						terminal.outWarn('The number must be in a range of -200000 and 200000\n');
						mustContinue = false;
					}
				} while (!mustContinue);
			}

			if (operator === '+') {
				accumulator = accumulator + number;
			} else if (operator === '-') {
				accumulator = accumulator - number;
			} else if (operator === '*') {
				accumulator = accumulator * number;
			} else if (operator === '/') {
				if (number === 0) {
					terminal.outError('Cannot be divided by zero\n');
					accumulator = '';
					mustContinue = false;
				} else {
					accumulator = accumulator / number;
				}
			}

			terminal.outSuccess(`\n${accumulator}\n`);
		} while (mustContinue);

		terminal.close();
	}

	function exampleObject() {
		const terminal = document.getElementById('terminal-test-object');

		terminal.out('This terminal will output an object:');
		terminal.out({ message: 'Object message', type: 'success' });
	}

	function exampleFreeText() {
		const terminal = document.getElementById('terminal-test-free-text');
		const button = document.getElementById('clear-terminal-test-free-text');

		terminal.out('Write something:');

		terminal.addEventListener('input', (event) => {
			console.log(event.detail);
		});

		button.addEventListener('click', () => {
			terminal.clear();
		});
	}

	async function handleReady() {
		exampleCalculator();
		exampleObject();
		exampleFreeText();
	}

	document.addEventListener('DOMContentLoaded', handleReady);
})();

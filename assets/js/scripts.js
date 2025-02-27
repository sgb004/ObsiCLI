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

		terminal.ou('Welcome.\nThis program is a calculator.\n');

		do {
			terminal.ou('\nEnter a number:');

			terminalIn = await terminal.in();
			accumulator = parseFloat(terminalIn);

			if (accumulator >= -200000 && accumulator <= 200000) {
				mustContinue = true;
			} else {
				terminal.ouError('The number must be in a range of -200000 and 200000\n');
				mustContinue = false;
			}
		} while (!mustContinue);

		do {
			do {
				terminal.ou('\nEnter an operator:');
				operator = await terminal.in();

				if (
					operator !== '+' &&
					operator !== '-' &&
					operator !== '*' &&
					operator !== '/' &&
					operator !== '='
				) {
					terminal.ouError('The operator must be + - * / =\n');
					mustContinue = false;
				} else {
					mustContinue = true;
				}
			} while (!mustContinue);

			if (operator === '=') {
				mustContinue = false;
			} else {
				do {
					terminal.ou('\nEnter a number:');

					terminalIn = await terminal.in();
					number = parseFloat(terminalIn);

					if (number >= -200000 && number <= 200000) {
						mustContinue = true;
					} else {
						terminal.ouError('The number must be in a range of -200000 and 200000\n');
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
					terminal.ouError('Cannot be divided by zero\n');
					accumulator = '';
					mustContinue = false;
				} else {
					accumulator = accumulator / number;
				}
			}

			terminal.ouSuccess(`\n${accumulator}\n`);
		} while (mustContinue);

		terminal.close();
	}

	async function handleReady() {
		exampleCalculator();
	}

	document.addEventListener('DOMContentLoaded', handleReady);
})();

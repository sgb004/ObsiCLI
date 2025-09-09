# ObsiCLI

A command line simulator for JavaScript programs as programming challenges. This simulator is intended as a means to print output and input.

## Usage

Add the following urls to your project:

[https://cdn.jsdelivr.net/gh/sgb004/ObsiCLI/dist/obsi-cli.css](https://cdn.jsdelivr.net/gh/sgb004/ObsiCLI/dist/obsi-cli.css)
[https://cdn.jsdelivr.net/gh/sgb004/ObsiCLI/dist/obsi-cli.web.js](https://cdn.jsdelivr.net/gh/sgb004/ObsiCLI/dist/obsi-cli.web.js)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sgb004/ObsiCLI/dist/obsi-cli.css" />

<script src="https://cdn.jsdelivr.net/gh/sgb004/ObsiCLI/dist/obsi-cli.web.js"></script>
```

Add the next tag in your HTML:

```html
<obsi-cli></obsi-cli>
```

In JavaScript you can use the following code:

```javascript
const terminal = document.querySelector('obsi-cli');
let input;

terminal.ou('Write something:');

input = await terminal.in(); //or await terminal.in("\nWrite something:"); if you want to add a prompt

terminal.ou(`You wrote: "${input}"`);
```

### Example

```html
<obsi-cli></obsi-cli>

<script>
	async function handleReady() {
		const terminal = document.querySelector('obsi-cli');
		let input;

		do {
			input = await terminal.in('\nWrite something:');

			terminal.ou(`\nYou wrote: "${input}"`);
		} while (input !== 'exit');

		terminal.close('\nThe program has ended.');
	}

	document.addEventListener('DOMContentLoaded', handleReady);
</script>
```

## Author

sgb004

## License

MIT License

# ObsiCLI

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/sgb004/ObsiCLI)
[![Author](https://img.shields.io/badge/author-sgb004-green.svg)](https://sgb004.com)

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

There are some variations of the method `out` that you can use to print different types of messages:

```javascript
terminal.outError('This is an error message.');
terminal.outWarning('This is a warning message.');
terminal.outWarn('This is a warning message.');
terminal.outSuccess('This is a success message.');
terminal.outInfo('This is an info message.');
terminal.outDebug('This is a debug message.');
```

## Events

The component has the next events:

-   `ready`: This event is dispatched when the component is ready.
-   `opened`: This event is dispatched when the component is opened. This event is dispatched after the `closed` event when the component is open again.
-   `closed`: This event is dispatched when the component is closed.

You can listen to these events by adding an event listener to the component:

```javascript
terminal.addEventListener('ready', () => {
	console.log('The terminal is ready.');
});
```

## License

[MIT](LICENSE)

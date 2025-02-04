(() => {
	const handleReady = () => {
		const terminal = document.getElementById('terminal');

		terminal.ou('Escribe tu nombre:');

		console.log(terminal);

		terminal
			.in()
			.then((result) => {
				console.log('FINISH', result);
			})
			.catch(console.error);
	};

	document.addEventListener('DOMContentLoaded', handleReady);
})();

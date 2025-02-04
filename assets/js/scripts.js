(() => {
	async function handleReady(){
		const terminal = document.getElementById('terminal');

		terminal.ou('Escribe tu nombre:');
    
    /*
		terminal
			.in()
			.then((result) => {
				console.log('FINISH', result);
			})
			.catch(console.error);
		*/
		
		const result = await terminal.in();
		
		console.log(result);
	};

	document.addEventListener('DOMContentLoaded', handleReady);
})();

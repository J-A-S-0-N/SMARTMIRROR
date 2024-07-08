const testAPIKeyValidity = async (apiKey) => {
	const city = 'London'; // Example city name
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if (response.ok) {
			console.log('API key is valid.');
			console.log('Weather data:', data);
		} else {
			console.log('API key is invalid.');
		}
	} catch (error) {
		console.error('Error testing API key validity:', error);
	}
};

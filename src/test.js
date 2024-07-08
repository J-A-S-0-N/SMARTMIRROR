const axios = require('axios');

const fetch = async() => {
	try{
		const response = await axios.get('http://127.0.0.1:5000/electricity');
		console.log(response);
	} catch(error){
		console.log("error");
	}
}

fetch();

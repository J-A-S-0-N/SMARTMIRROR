const axios = require('axios');

const fetchPowerLeft = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/power_left');
        console.log(`Power_Value: ${response.data.powerLeft}`);
    } catch (error) {
        console.error('Failed to fetch power left:', error.message);
    }
};

// Initial fetch
fetchPowerLeft();

// Set up a timer to fetch data every 10 seconds
setInterval(fetchPowerLeft, 10000);


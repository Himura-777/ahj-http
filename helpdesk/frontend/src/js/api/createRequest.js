const createRequest = async (options = {}) => {
	const { url, method = 'GET', data, callback } = options;

	try {
		const config = {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		if (data) {
			config.body = JSON.stringify(data);
		}

		const response = await fetch(url, config);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		if (callback) callback(result);
		return result;
	} catch (error) {
		console.error('Fetch error:', error);
		if (callback) callback(null, error);
		throw error;
	}
};

export default createRequest;

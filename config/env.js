const config = {
	port: process.env.PORT || 3000,

	apiHost: 'localhost',
	apiPort: 3001,

	webpackHost: 'localhost',
	webpackPort: 3002,

	reduxDevTools: false,
};

// export default config; // TODO: Fix this
module.exports = config;

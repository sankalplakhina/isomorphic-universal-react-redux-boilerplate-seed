module.exports = {
	extends: 'airbnb',

	"settings": {
		"import/resolver": {
			"webpack": {
				"config": "./webpack/prod.config"
			}
		}
	},

	globals: {
		__CLIENT__: true,
		__DEVTOOLS__: true,
	},
};

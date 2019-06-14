const settingsObject = {
	baseUrl: 'js',
	config: {
		text: {
			useXhr: function (url, protocol, hostname, port) {
				return true;
			}
		},
	},
	paths: {
		"text": "lib/text",
		"axios": "lib/axios.min",
		"qs": "lib/qs"
	}
};

if (typeof define !== 'undefined') {
	define(() => settingsObject);
} else {
	module.exports = settingsObject;
}
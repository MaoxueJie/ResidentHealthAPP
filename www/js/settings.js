const settingsObject = {
	baseUrl: 'js',
	//baseUrl: 'http://127.0.0.1:8090/ll/js',
	config: {
		text: {
			useXhr: function (url, protocol, hostname, port) {
				return true;
			}
		},
	},
	paths: {
		"text": "lib/text"
	}
};

if (typeof define !== 'undefined') {
	define(() => settingsObject);
} else {
	module.exports = settingsObject;
}
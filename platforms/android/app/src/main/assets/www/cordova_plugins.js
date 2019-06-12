cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "jpush-phonegap-plugin.JPushPlugin",
      "file": "plugins/jpush-phonegap-plugin/www/JPushPlugin.js",
      "pluginId": "jpush-phonegap-plugin",
      "clobbers": [
        "JPush"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-x5-webview": "3.1.0",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-vibration": "3.1.0",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-jcore": "1.2.8",
    "jpush-phonegap-plugin": "3.6.4"
  };
});
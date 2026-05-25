const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Update the input path to point inside the src folder
module.exports = withNativeWind(config, { input: "./src/global.css" });

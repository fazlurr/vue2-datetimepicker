const vue = require("rollup-plugin-vue");
const filesize = require("rollup-plugin-filesize");
const uglify = require("rollup-plugin-uglify");
const buble = require("rollup-plugin-buble");

module.exports = {
	input: "./src/plugin",
	plugins: [filesize(), vue({ css: true }), buble(), uglify()],
	output: {
		file: "dist/bundle.min.js",
		format: "iife",
		name: "DateTimePicker"
	}
};

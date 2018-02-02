const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const resolve = dir => path.join(__dirname, "..", dir);

const config = {
	output: {
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".js", ".vue"],
		alias: {
			"@": resolve("src")
		}
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				sourcemap: false,
				minimize: true,
				compress: {
					warnings: false
				}
			}
		})
	]
};

module.exports = [
	merge(config, {
		entry: path.resolve(__dirname, "./src/plugin.js"),
		output: {
			filename: "vue2-datetimepicker.js",
			libraryTarget: "window",
			library: "DateTimePicker"
		}
	}),
	merge(config, {
		entry: path.resolve(__dirname, "./src/DateTimePicker"),
		output: {
			filename: "vue2-datetimepicker.js",
			libraryTarget: "umd",
			library: "DateTimePicker",
			umdNamedDefine: true
		}
	})
];

const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const resolve = dir => path.join(__dirname, "..", dir);

const config = {
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
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
				// options: {
				// 	loaders: {
				// 		css: ExtractTextWebpackPlugin.extract({
				// 			use: "css-loader",
				// 			fallback: "vue-style-loader"
				// 		})
				// 	}
				// }
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
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false,
			mangle: true,
			compress: {
				warnings: false
			}
		})
		// new ExtractTextWebpackPlugin({
		// 	filename: "[name].css"
		// })
	]
};

module.exports = [
	merge(config, {
		entry: path.resolve(__dirname + "/src/plugin.js"),
		output: {
			filename: `[name].web.js`,
			libraryTarget: "window",
			library: "DateTimePicker"
		}
	}),
	merge(config, {
		entry: path.resolve(__dirname + "/src/DateTimePicker"),
		output: {
			filename: `[name].node.js`,
			libraryTarget: "umd",
			library: "vue2-datetimepicker",
			umdNamedDefine: true
		}
	})
];

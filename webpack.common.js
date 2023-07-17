const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const ImageminMozjpeg = require("imagemin-mozjpeg");
const ImageminPngquant = require("imagemin-pngquant");

module.exports = {
	entry: {
		app: path.resolve(__dirname, "src/scripts/index.js"),
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 20000,
			maxSize: 50000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			automaticNameDelimiter: "~",
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "src/templates/index.html"),
			favicon: path.resolve(__dirname, "src/public/icons/favicon.png"),
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/public/"),
					to: path.resolve(__dirname, "dist/"),
				},
			],
		}),
		new ImageminWebpackPlugin({
			plugins: [
				ImageminMozjpeg({
					quality: 15,
					progressive: true,
				}),
				ImageminPngquant({
					quality: [0.1, 0.3],
				}),
			],
		}),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: {
						quality: 20,
					},
				},
			],
			overrideExtension: true,
		}),
	],
};

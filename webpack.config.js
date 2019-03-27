const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require('webpackbar');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const {
	VueLoaderPlugin
} = require("vue-loader");
const Jarvis = require('webpack-jarvis');

require("dotenv").config();

module.exports = {		
		entry: path.resolve(__dirname, "src/entry.js"),
		output: {
			path: path.resolve(__dirname, "docs")
		},
		devServer: {
			contentBase: path.join(__dirname, 'docs'),
			compress: true,
			port: 9000,
			stats: 'errors-only',
		},
		module: {
			rules: [{
					test: /\.vue$/,
					use: "vue-loader"
				},
				{
					test: /\.scss$/,
					use: [
						"vue-style-loader",
						"css-loader",
						"sass-loader"
					]
				},
				{
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /node_modules/,
				}
		]
	},
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'src/app/'),
      Routes: path.resolve(__dirname, 'src/routes/'),
      Services: path.resolve(__dirname, 'src/services/'),
      Store: path.resolve(__dirname, 'src/store/')
    }
  },
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: require("html-webpack-template"),
			title: process.env.APP_TITLE,
			filename: path.resolve(__dirname, "docs/README.md"), //relative to root of the application
			bodyHtmlSnippet: "<div id='root'></div>",
		}),
		new VueLoaderPlugin(),
		new WebpackBar(),
		new Jarvis({
    		port: 1337 // optional: set a port
		}),
	]
}

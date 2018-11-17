module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.imba$/,
				loader: 'imba/loader',
			}
		]
	},
	resolve: {
		extensions: [".imba", ".js", ".json"]
	},
	entry: "./src/App.imba",
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: './public'
	},
	output: {  path: __dirname + '/dist', filename: "app.js" }
}

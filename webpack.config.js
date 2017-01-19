var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:  './src',
	devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
	},
    output: {
      path:          'builds',
      filename:      'bundle.js',
      publicPath:    'builds/',
    },
	externals: {
		'cheerio': 'window',
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
	  },
    plugins: [],
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel',
          include: [
            path.resolve(__dirname, "src"),
          ],
		  query: {
			presets: ['react', 'es2015', 'stage-0'],
		  },
        },
      ],
    }
};

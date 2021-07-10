module.exports = {
	configureWebpack: {
		alias: {
			'@': resolve('src'),
			'assets': resolve('src/assets'),
			'common': resolve('src/common'),
			'components': resolve('src/components'),
			'network': resolve('src/network'),
			'views': resolve('src/views'),
		}
	}
}
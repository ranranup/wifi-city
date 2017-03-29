module.exports = {
	development: {
		srcDir: 'src',
		port: 8899,
		notProcessedDir: [],
		proxyTarget: {
			'/api': 'http://10.82.198.225:8000'
		}		
	},
	production: {
		srcDir: 'src',
		port: 8899,
		proxyTarget: {
			'/api': 'http://10.82.198.225:8000'
		}		
	}
}
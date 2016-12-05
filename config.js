module.exports = {
	development: {
		srcDir: 'src',
		port: 8090,
		notProcessedDir: [],
		proxyTarget: {
			'/api': 'http://192.168.1.108:8000'
		}		
	},
	production: {
		srcDir: 'src',
		port: 8090,
		proxyTarget: {
			'/api': 'http://192.168.1.108:8000'
		}		
	}

}
module.exports = {
	development: {
		srcDir: 'src',
		port: 8899,
		notProcessedDir: [],
		proxyTarget: {
			'/api': 'http://192.168.1.102:8000'
		}		
	},
	production: {
		srcDir: 'src',
		port: 8899,
		proxyTarget: {
			'/api': 'http://192.168.1.102:8000'
		}		
	}
}
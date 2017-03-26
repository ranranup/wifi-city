module.exports = {
	development: {
		srcDir: 'src',
		port: 8899,
		notProcessedDir: [],
		proxyTarget: {
			'/api': 'http://192.168.1.108:8000/api'
		}		
	},
	production: {
		srcDir: 'src',
		port: 8899,
		proxyTarget: {
			'/api': 'http://192.168.1.108:8000/api'
		}		
	}
}
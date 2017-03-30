module.exports = {
	development: {
		srcDir: 'src',
		port: 8899,
		notProcessedDir: [],
		proxyTarget: {
			/*'/api': 'http://192.168.1.107:8000/api'*/
			'/api': 'http://192.168.1.101:8000'
		}		
	},
	production: {
		srcDir: 'src',
		port: 8899,
		proxyTarget: {
			'/api': 'http://192.168.1.103:8000'
		}		
	}
}
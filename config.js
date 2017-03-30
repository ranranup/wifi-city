module.exports = {
	development: {
		srcDir: 'src',
		port: 8899,
		notProcessedDir: [],
		proxyTarget: {
			/*'/api': 'http://192.168.1.107:8000/api'*/
			'/api': 'http://10.82.199.228:8000'
		}		
	},
	production: {
		srcDir: 'src',
		port: 8899,
		proxyTarget: {
			'/api': 'http://10.82.199.228:8000'
		}		
	}
}
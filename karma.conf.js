// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config)
{
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular/cli'],
		plugins: [
			require('karma-jasmine'),
			require('karma-webdriver-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular/cli/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly'],
			fixWebpackSourcePaths: true
		},
		angularCli: {
			environment: 'dev'
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
        singleRun: false,
        
        // browsers: ['chromeDriver'],
		// customLaunchers: {
		// 	'chromeDriver': {
		// 		base: 'WebDriver',
		// 		config: {
		// 			hostname: 'localhost',
		// 			port: 4444,
		// 		},
		// 		browserName: 'chrome',
		// 		cromeOptions: {
		// 			"debuggerAddress": "127.0.0.1:9222",
		// 		},
		// 		name: 'Karma',
		// 	}
		// },
	});
};

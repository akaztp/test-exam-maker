// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
	allScriptsTimeout: 11000,
	specs: [
		'./e2e/**/*.e2e-spec.ts'
	],
	capabilities: {
		'browserName': 'chrome',
		// when using linux chromedriver, use the debuggerAddress of a remote debugging configured chrome
		//chromeOptions: {
		//	"debuggerAddress": "127.0.0.1:9222",
		//},
	},
	directConnect: false,
	 // address of independent ChromeDriver, use: chromedriver --post=4444 --url-base=wd/hub
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://localhost:4200/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () { }
	},
	onPrepare()
	{
		require('ts-node').register({
			project: 'e2e/tsconfig.e2e.json'
		});
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
	}
};

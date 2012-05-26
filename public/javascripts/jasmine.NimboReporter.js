jasmine.NimboReporter = function() {
	// console.log('Reporter new NimboReporter');
};

jasmine.NimboReporter.prototype.reportRunnerStarting = function(runner) {
	// console.log('Reporter reporterRunnerStarting', runner);
};

jasmine.NimboReporter.prototype.reportRunnerResults = function(runner) {
	top.nimbo.spinner.postMessage('finished');	
	// console.log('Reporter reportRunnerResults', runner);
};

jasmine.NimboReporter.prototype.reportSuiteResults = function(suite) {
	// console.log('Reporter reportSuiteResults', suite);
};

jasmine.NimboReporter.prototype.reportSpecStarting = function(spec) {
	// console.log('Reporter reportSpecStarting', spec);
};

jasmine.NimboReporter.prototype.reportSpecResults = function(spec) {
	// console.log('Reporter reportSpecResults', spec);
};

jasmine.NimboReporter.prototype.log = function(str) {
	// console.log('Reporter log', str);
};

jasmine.getEnv().addReporter(new jasmine.NimboReporter());
jasmine.getEnv().execute();
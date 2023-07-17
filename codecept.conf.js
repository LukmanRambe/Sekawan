const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
	tests: "e2e/**/*.spec.js",
	output: "e2e/outputs",
	helpers: {
		Puppeteer: {
			url: "http://127.0.0.1:8080",
			keepBrowserState: true,
			fullPageScreenshots: true,
			waitForNavigation: ["domcontentloaded"],
			waitForAction: 1000,
			show: true,
			browser: "chrome",
			chrome: {
				args: ["--no-sandbox"],
			},
		},
		REST: {
			endpoint: "https://restaurant-api.dicoding.dev",
			defaultHeaders: {
				"Content-Type": "application/json",
			},
		},
		JSONResponse: {},
	},
	bootstrap: null,
	include: {
		I: "./steps_file.js",
	},
	name: "sekawan-restaurant",
	plugins: {
		screenshotOnFail: {
			enabled: true,
		},
	},
};

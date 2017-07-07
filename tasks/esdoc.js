"use strict";

const esdoc = require("esdoc");
const publisher = require("esdoc/out/src/Publisher/publish");

module.exports = function (grunt) {
    grunt.registerMultiTask("esdoc", "Grunt plugin for ESDoc", function () {
        // Merge task-specific and/or target-specific options with these defaults.
        const options = this.options({ coverage: true });
        let config = options;

        if (typeof options.config != "undefined") {
            config = grunt.file.readJSON(options.config);
        }

        // The destination must be set.
        if (typeof config.destination != "string") {
            grunt.fail.fatal(`esdoc requires that the "destination" option be set.`);
        }

        // If grunt.debug is set to true, then override whatever the debug option is set to by any esdoc config.
        config.debug = grunt.option("debug") && grunt.option("verbose") || config.debug;

        const oldLog = console.log;

        try {
            // Capture console.log() so we can filter esdoc's output. If in verbose mode, log the captured lines.
            const lines = [];

            console.log = (msg) => {
                lines.push(msg);

                if (grunt.option("verbose")) {
                    oldLog.apply(console, arguments);
                }
            }

            // Pass the config to esdoc to publish the documentation.
            esdoc.default.generate(config, publisher.default);

            // If coverage is configured, then parse out the coverage values.
            // This goes in reverse (as coverage is near the end) and uses some to iterate over the reversed lines until a matching one is found.
            lines.reverse().some((ln, m) => {
                if (m = ln.match(/^Coverage:\s*(\d{1,3}(?:\.\d{0,2}))%\s*\((\d+)\/(\d+)\)$/)) {
                	const [percent, amount, total] = [1, 2, 3].map((n) => parseFloat(m[n]));
                    grunt.log[percent < 100?   "warn" : "ok"](`Coverage: ${percent}%`);
                    grunt.log[ amount < total? "warn" : "ok"](`Files: ${amount}/${total}`);
                }

                return m;
            });
        } catch (err) {
        	console.log = oldLog;
            // Fail on any error.
            grunt.fail.fatal(err);
        } finally {
            // Reset console.log.
            console.log = oldLog;
        }
    });
};

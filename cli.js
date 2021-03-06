#!/usr/bin/env node
'use strict';

/**
 * Cacheuer
 * A modular HTTP / API result cacher and transformer that runs as a CLI application
 *
 * @author Simon Heimler <heimlersimon@gmail.com>
 *
 * SHORT-TERM:
 * TODO: Write tests, more examples and test / mock various error conditions
 * TODO: Test and watch memory usage
 *
 * LONG-TERM:
 * TODO: Scriptable / programmatic transformers (_transformer.js)
 * TODO: Modular Serializer (cocoon project)
 */

//////////////////////////////////////////
// REQUIREMENTS                         //
//////////////////////////////////////////

var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var initialSettings = require('./src/defaultSettings');
var main = require('./src/main');

//////////////////////////////////////////
// CLI COMMANDS                         //
//////////////////////////////////////////

// Allows to specify the workign directory manually
// If not given, the current directory is used by default
if (argv.dir) {
    initialSettings.cwd = path.normalize(argv.dir);
}

// Enable debugging
if (argv.debug) {
    initialSettings.debug = true;
}

main.bootstrap(initialSettings);

//////////////////////////////////////////
// REQUIREMENTS                         //
//////////////////////////////////////////

var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var semlog = require('semlog');
var log = semlog.log;


/**
 * Currently supported
 *  * ASK requests
 *
 * @param dir
 * @returns {{}}}
 */
exports.read = function(dir) {

    var fileList = fs.readdirSync(dir);

    var returnObj = {
        requestSettings: {},
        masterSettings: {},
        fileList: fileList
    };

    if (fileList && fileList.length > 0) {

        for (var i = 0; i < fileList.length; i++) {

            var fileName = fileList[i];

            if (fileName.indexOf('.yaml') > -1) {

                var strippedFileName = fileName.split('.yaml').join('');

                try {

                    // Read YAML files
                    var fileContent = fs.readFileSync(path.join(dir, fileName));
                    var obj = yaml.load(fileContent, 'utf8');

                    // Add ID to settings object
                    obj.id = strippedFileName;

                    if (fileName === '_settings.yaml') {
                        returnObj.masterSettings = obj;
                    } else {
                        if (obj.ignore) {
                            log('[i] Ignoring task: ' + obj.id);
                        } else {
                            obj.name = strippedFileName;
                            returnObj.requestSettings[strippedFileName] = obj;
                        }

                    }

                } catch (e) {
                    log('[E] Could not parse ' + fileName + '!');
                    log(e);
                    return false;
                }

            } else if (fileName === '_tranformers.js') {
                // TODO: Handle the transformers.js module
                // Add / Overwrite custom transformers to /src/transformers.js
                log('[W] _transformsers.js module found, but feature is not supported yet!');
            }
        }
    }

    return returnObj;
};

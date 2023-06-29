const _ = require('lodash');
const path = require('path');
const glob = require('glob');

const getGlobbedPaths = (globPatterns, excludes) => {
    let urlRegex = new RegExp("^(?:[a-z]+:)?//", "i");

    let output = [];

    if (_.isArray(globPatterns)) {
        globPatterns.forEach((globPattern) => {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            let files = glob.sync(globPatterns);

            if(excludes) {
                files = files.map((file) => {
                    if (_.isArray(excludes)) {
                        for (let i in excludes) {
                            if (excludes.hasOwnProperty(i)) {
                                file = file.replace(excludes[i], "");
                            }
                        }
                    } else {
                        file =  file.replace(excludes, "");
                    }

                    return file;
                });
            }
            
            output = _.union(output, files);
        }
    }

    return output;
};

const initEnviromentVariables = () => {
    require('dotenv').config();
}

const getGlobalConfig = () => {
     const assets = require(path.join(
        process.cwd(),
        'src/config/assets/default.js'
    ));
      
    const config = {
        routes: getGlobbedPaths(assets.routes),
    };

    return config;
}

module.exports = { initEnviromentVariables, getGlobalConfig }
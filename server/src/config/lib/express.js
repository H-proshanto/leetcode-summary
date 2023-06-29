const path = require('path');
const express = require('express');
const { getGlobalConfig } = require('../index');
const cors = require('cors');

module.exports = () => {
    const app = express();
    const globalConfig = getGlobalConfig();

    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            return callback(null, true);
        },
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.set('port', process.env['PORT']);

    globalConfig.routes.forEach(
        routPath => require(path.resolve(routPath))(app)
    );

    return app;
}

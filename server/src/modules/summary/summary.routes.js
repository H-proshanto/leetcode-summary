const validate = require('../core/middlewares/validate');
const { fetchSummarySchema } = require('./summary.schema');
const { fetchUserSummary } = require('./summary.controller');

module.exports = (app) => {
    app.route('/summary')
        .post(validate(fetchSummarySchema), fetchUserSummary)
}
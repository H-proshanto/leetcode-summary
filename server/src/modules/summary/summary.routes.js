const validate = require('../core/middlewares/validate');
const { fetchSummarySchema } = require('./summary.schema');
const { fetchUserProblemsSolved, fetchUserSummary } = require('./summary.controller');

module.exports = (app) => {
    app.route('/summary')
        .post(validate(fetchSummarySchema), fetchUserSummary)
    
    app.route('/stats')
        .post(validate(fetchSummarySchema), fetchUserProblemsSolved)
}
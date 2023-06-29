const { string, object } = require('yup')

const fetchSummarySchema = object().shape({
    username: string()
        .required("username is required"),
});

module.exports = { fetchSummarySchema }
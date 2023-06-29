const { string, object } = require('yup')

const fetchSummarySchema = object().shape({
    userName: string()
        .required("username is required"),
});

module.exports = { fetchSummarySchema }
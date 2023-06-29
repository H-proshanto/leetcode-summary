const { LEETCODE_API_ENDPOINT } = require('./config');
const axios = require('axios');

const fetchUserSummary = async (req, res) => {
    try {   
        const { username } = req.body;
        const data = 
        {
            query: "\n query userProblemsSolved($username: String!) {\n allQuestionsCount {\n difficulty\n count\n } \n matchedUser(username: $username) {\n problemsSolvedBeatsStats {\n difficulty\n percentage\n }\n  submissionCalendar submitStatsGlobal {\n acSubmissionNum {\n difficulty\n count\n }\n }\n }\n}\n",
            variables: {
                username,
            }
        }

        const response = await axios.post(LEETCODE_API_ENDPOINT,data);

        if(response?.data?.errors) {
            res.status(404).send("No data found");
        } else {
            res.status(200).send({data: response.data.data.matchedUser});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
};

module.exports = {
    fetchUserSummary,
}
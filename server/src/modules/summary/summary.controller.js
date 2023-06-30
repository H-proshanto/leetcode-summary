const { LEETCODE_API_ENDPOINT } = require('./config');
const axios = require('axios');

const fetchUserSummary = async (req, res) => {
    try {
        const { username } = req.body;
        const payload = 
        {
            query: "\n  query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  }\n}\n",
            variables: {
                username,
                limit: 100,
            }
        }

        const response = await axios.post(LEETCODE_API_ENDPOINT,payload);

        if(response?.data?.errors) {
            res.status(404).send("No data found");
        } else {
            const now = new Date();
            const {recentAcSubmissionList} = response.data.data;
            const result = [];

            for (let i = 1; i <= 7; i++) {
                const startdateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i,0,0,0,0).getTime();
                const enddateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i,23,59,59,59).getTime();
                const filteredProblems = recentAcSubmissionList.filter(item => {
                    const submissionTime = new Date(item.timestamp * 1000).getTime();
                    if (submissionTime >= startdateTime && submissionTime <= enddateTime) {
                        return true;
                    }

                    return false;
                });
                result.push({timestamp: startdateTime, item: filteredProblems});
            }
            res.status(200).send({data: result});
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

const fetchUserProblemsSolved = async (req, res) => {
    try {   
        const { username } = req.body;
        const payload = 
        {
            query: "\n query userProblemsSolved($username: String!) {\n allQuestionsCount {\n difficulty\n count\n } \n matchedUser(username: $username) {\n problemsSolvedBeatsStats {\n difficulty\n percentage\n }\n  submissionCalendar submitStatsGlobal {\n acSubmissionNum {\n difficulty\n count\n }\n }\n }\n}\n",
            variables: {
                username,
            }
        }

        const response = await axios.post(LEETCODE_API_ENDPOINT,payload);

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
    fetchUserProblemsSolved,
    fetchUserSummary
}
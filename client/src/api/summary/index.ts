import axios from "axios";
import { FieldValues } from 'react-hook-form';
import { STATS_URL, SUMMARY_URL } from "../config";


export const fetchStats = async (data: FieldValues) => {
    const response = await axios(STATS_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data
    })

    return response.data;
}

export const fetchSummary = async (data: FieldValues) => {
    const response = await axios(SUMMARY_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data
    })

    return response.data;
}
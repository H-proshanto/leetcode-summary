import axios from "axios";
import { FieldValues } from 'react-hook-form';
import { SUMMARY_URL } from "../config";


export const fetchSummary = async (data: FieldValues) => {
    const response = await axios(SUMMARY_URL, {
        headers: {'Content-Type': 'application/json'},
        data
    })

    
    return response.data;
}
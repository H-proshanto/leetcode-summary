import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
// for local build use http://localhost:3000
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
console.log(BASE_URL)
export const STATS_URL = `${BASE_URL}/stats`;
console.log(STATS_URL)
export const SUMMARY_URL = `${BASE_URL}/summary`;

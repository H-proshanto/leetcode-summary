import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
// for local build use http://localhost:3000
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
console.log(BASE_URL)
export const STATS_URL = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/stats`;
export const SUMMARY_URL = `${import.meta.env.VITE_REACT_APP_SERVER_URL}/summary`;
console.log(SUMMARY_URL)

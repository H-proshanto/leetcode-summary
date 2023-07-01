import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
// for local build use http://localhost:3000
const BASE_URL = 'https://quaint-lamb-jumper.cyclic.app';
export const STATS_URL = `${BASE_URL}/stats`;
export const SUMMARY_URL = `${BASE_URL}/summary`;

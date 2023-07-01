import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
// Free production deploy server
const BASE_URL = "https://quaint-lamb-jumper.cyclic.app";
export const STATS_URL = `${BASE_URL}/stats`;
export const SUMMARY_URL = `${BASE_URL}/summary`;

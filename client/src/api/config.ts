import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const BASE_URL = 'http://localhost:3000';
export const SUMMARY_URL = `${BASE_URL}/users/login`;

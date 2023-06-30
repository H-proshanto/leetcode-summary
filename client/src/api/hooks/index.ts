
import { useMutation } from "@tanstack/react-query";
import { fetchStats, fetchSummary } from "../summary";

export const useFetchStats = () => {
    return useMutation(fetchStats);
  }

  export const useFetchSummary = () => {
    return useMutation(fetchSummary);
  }
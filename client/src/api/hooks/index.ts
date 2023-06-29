
import { useMutation } from "@tanstack/react-query";
import { fetchSummary } from "../summary";

export const useFetchSummary = () => {
    return useMutation(fetchSummary);
  }
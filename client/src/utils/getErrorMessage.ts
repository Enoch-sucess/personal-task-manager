import axios from "axios";

export const getErrorMessage = (err: unknown, fallback: string): string =>
  axios.isAxiosError(err)
    ? (err.response?.data?.message ?? fallback)
    : fallback;

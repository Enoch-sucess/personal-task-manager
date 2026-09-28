import { createContext } from "react";
import type { AuthContextValue } from "../types";

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
);

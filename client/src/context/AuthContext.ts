console.log("1. AuthContext module loaded", import.meta.url);
console.log("AuthContext loaded:", import.meta.url);
import { createContext } from "react";
import type { AuthContextValue } from "../types";

export const AuthContext = createContext<AuthContextValue | null>(null);

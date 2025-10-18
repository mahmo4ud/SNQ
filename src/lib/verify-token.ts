import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// JWT auth utility for API routes, thrown if missing/invalid
export function verifyAuthToken(token?: string): {
  userId: string;
  email?: string;
} {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Need the JWT_SECRET from .env");
  }
  if (!token) throw new Error("No token provided");
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email?: string };
  } catch {
    throw new Error("Invalid or expired token");
  }
}

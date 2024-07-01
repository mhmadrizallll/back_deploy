import express from "express";

declare module "express-session" {
  interface SessionData {
    isAuthenticated: boolean;
    user: any; // Anda bisa lebih spesifik tentang tipe dari 'user'
  }
}

declare module "express-serve-static-core" {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}

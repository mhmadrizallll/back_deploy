declare namespace NodeJS {
  interface ProcessEnv {
    SUPERADMIN_SECRET: string;
    ADMIN_SECRET: string;
    MEMBER_SECRET: string;
    PORT?: string;
  }
}

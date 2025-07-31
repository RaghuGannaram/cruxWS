declare module NodeJS {
    interface ProcessEnv {
        FRONTEND_DEV_URL: string;
        FRONTEND_PROD_URL: string;
        NODE_ENV: "development" | "production";
        PORT: string;
        LOG_LEVEL: string;
        ERROR_EXPOSURE_DEPTH: string;
    }
}

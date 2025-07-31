import type { Request, Response, NextFunction } from "express";

export enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    HTTP = "http",
    VERBOSE = "verbose",
    DEBUG = "debug",
    SILLY = "silly",
}

export const colorCode: Record<LogLevel, string> = {
    [LogLevel.ERROR]: "red",
    [LogLevel.WARN]: "yellow",
    [LogLevel.INFO]: "green",
    [LogLevel.HTTP]: "magenta",
    [LogLevel.VERBOSE]: "cyan",
    [LogLevel.DEBUG]: "blue",
    [LogLevel.SILLY]: "pink",
};

export const levelCode: Record<LogLevel, number> = {
    [LogLevel.ERROR]: 0,
    [LogLevel.WARN]: 1,
    [LogLevel.INFO]: 2,
    [LogLevel.HTTP]: 3,
    [LogLevel.VERBOSE]: 4,
    [LogLevel.DEBUG]: 5,
    [LogLevel.SILLY]: 6,
};

export enum ErrorExposureDepth {
    HTTP = "HTTP",
    BUSINESS = "BUSINESS",
    DATA = "DATA",
    COMPLETE = "COMPLETE",
}

export const errorExposureDepthCode: Record<ErrorExposureDepth, number> = {
    [ErrorExposureDepth.HTTP]: 1,
    [ErrorExposureDepth.BUSINESS]: 2,
    [ErrorExposureDepth.DATA]: 3,
    [ErrorExposureDepth.COMPLETE]: Number.MAX_SAFE_INTEGER,
};

export interface ApplicationError extends Error {
    status: number;
    message: string;
    type: string;
    cause?: ApplicationError | Error | null;
    stack?: string;
}

export interface IController {
    (req: Request, res: Response, next: NextFunction): Promise<void>;
}
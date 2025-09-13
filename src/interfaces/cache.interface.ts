import { Request, Response } from "express";

export interface ICacheOptions {
    ttl?: number;
    keyPrefix?: string;
    skipCacheIf?: (req: Request) => boolean;
    invalidateOnMethods?: string[];
}
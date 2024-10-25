import { getEnv } from '@/env';
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();

// if node-env is development 
if (getEnv("NODE_ENV", "development") === "development") globalThis.prisma = db;
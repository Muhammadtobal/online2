import { PrismaClient } from "@prisma/client";
import { execSync } from 'child_process';

try {
  execSync('npx prisma generate');
} catch (err) {
  console.error('Failed to generate Prisma Client:', err);
}
const prisma = new PrismaClient();

export default prisma;

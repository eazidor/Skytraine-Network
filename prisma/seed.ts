import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL ?? "";
const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (process.env.ADMIN_SEED_EMAIL ?? "admin@skytraine.com").toLowerCase().trim();
  const name = process.env.ADMIN_SEED_NAME ?? "Skytraine Admin";
  const password = process.env.ADMIN_SEED_PASSWORD ?? "Skytraine@2025";

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin "${email}" already exists. Skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.admin.create({
    data: { email, name, passwordHash },
  });
  console.log(`Created admin account: ${email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

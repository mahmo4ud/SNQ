import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const firstName = process.env.ADMIN_FIRST_NAME || process.env.ADMIN_FIRSTNAME;
  const lastName = process.env.ADMIN_LAST_NAME || process.env.ADMIN_LASTNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || !firstName || !lastName) {
    throw new Error(
      "Missing required admin environment variables. Please set ADMIN_EMAIL, ADMIN_PASSWORD, and either (ADMIN_FIRST_NAME & ADMIN_LAST_NAME) or (ADMIN_FIRSTNAME & ADMIN_LASTNAME)."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {}, // Do not update if exists
    create: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });

  console.log("✅ Admin user seeded: " + email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";

import bcrypt from "bcryptjs";

import { prisma } from "../src/lib/prisma";

async function main() {
  const passwordHash = await bcrypt.hash("admin12345", 10);

  await prisma.adminUser.upsert({
    where: { email: "admin@madrak.sa" },
    update: {},
    create: {
      name: "مدير النظام",
      email: "admin@madrak.sa",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "../src/lib/db";

async function main() {
  const email = process.argv[2];

  if (!email) {
    console.error("Please provide an email address.");
    console.log("Usage: npx tsx scripts/promote-admin.ts <email>");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error(`User with email ${email} not found.`);
    process.exit(1);
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { role: "admin" },
  });

  console.log(`User ${updatedUser.email} has been promoted to ${updatedUser.role}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

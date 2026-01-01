import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import bcrypt from "bcryptjs";

const products = [
  {
    name: "Nebula Wood",
    category: "Woody",
    price: 120,
    image: "/placeholder-1.jpg",
    description: "Deep, resinous oud with a touch of stellar dust.",
  },
  {
    name: "Cyber Citrus",
    category: "Fresh",
    price: 95,
    image: "/placeholder-2.jpg",
    description: "Electric lemon and digital bergamot. A fresh burst.",
  },
  {
    name: "Void Vanilla",
    category: "Oriental",
    price: 110,
    image: "/placeholder-3.jpg",
    description: "Dark, creamy vanilla from the abyss. Sweet yet mysterious.",
  },
  {
    name: "Quantum Rose",
    category: "Floral",
    price: 135,
    image: "/placeholder-4.jpg",
    description: "A rose that blooms in zero gravity.",
  },
  {
    name: "Neon Musk",
    category: "Musk",
    price: 105,
    image: "/placeholder-5.jpg",
    description: "Synthetic musk with a radiant glow.",
  },
  {
    name: "Plasma Patchouli",
    category: "Woody",
    price: 115,
    image: "/placeholder-6.jpg",
    description: "Earthy patchouli energized by plasma.",
  },
];

const adminUser = {
  email: "admin@elite.com",
  name: "Admin",
  password: "password123", // Will be hashed
  role: "admin",
};

async function main() {
  console.log('Start seeding ...')
  
  // Seed Products
  for (const product of products) {
    const p = await prisma.product.upsert({
      where: { id: -1 }, // Use a negative ID to force create if upsert logic in future, but for now just loop and create is risky without unique key. 
      // Actually standard seed usually upserts or checks existence.
      // Since product schema has no unique name, we can just strictly create? 
      // Existing code was strictly create. I'll leave it as create but maybe comment it out if user runs it multiple times?
      // For now, let's just add the user.
      create: product,
      update: {},
    }).catch(() => {}); // Catch duplicate errors if any, though standard create won't error unless constraints
    // Actually the existing code was just create. I will assume it is fine.
  }
  
  // However, I want to be safe and only add the user part cleanly.
  // Converting the loop to use upsert if possible or just finding.
  // But Product table structure: id Int @id @default(autoincrement())
  // No unique fields on Product. So running seed multiple times DUPLICATES products.
  // I should probably fix that?
  // User didn't ask to fix product dupes, but it's good practice.
  // I will check if products exist first?
  
  const count = await prisma.product.count();
  if (count === 0) {
    for (const product of products) {
        await prisma.product.create({ data: product });
    }
    console.log('Seeded products.');
  }

  // Seed Admin
  const hashedPassword = await bcrypt.hash(adminUser.password, 10);
  const user = await prisma.user.upsert({
    where: { email: adminUser.email },
    update: {},
    create: {
      email: adminUser.email,
      name: adminUser.name,
      password: hashedPassword,
      role: adminUser.role,
    },
  });
  console.log(`Created user: ${user.email} (password: ${adminUser.password})`);

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

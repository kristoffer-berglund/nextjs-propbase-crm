import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { faker } from "@faker-js/faker";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// const prisma = new PrismaClient();

async function main() {
  console.log("Rensar databasen...");
  await prisma.property.deleteMany();

  console.log("Seedning startar: Skapar 20 properties...");

  const properties = Array.from({ length: 20 }).map(() => ({
    address: faker.location.streetAddress(),
    agent: faker.person.fullName(),
    price: Number(faker.finance.amount(100000, 2000000, 0)),
    listingNumber: faker.string.alphanumeric(10),
    description: faker.lorem.paragraph(),
  }));

  for (const p of properties) {
    await prisma.property.create({
      data: p,
    });
  }

  console.log("Seedning klar!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Join the Prisma Discord",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//         {
//           title: "Prisma on YouTube",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
//   {
//     name: "Bob",
//     email: "bob@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Follow Prisma on Twitter",
//           content: "https://www.twitter.com/prisma",
//           published: true,
//         },
//       ],
//     },
//   },
// ];

// export async function main() {
//   for (const u of userData) {
//     await prisma.book.create({ data: u });
//   }
// }

// main();

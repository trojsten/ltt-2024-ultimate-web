console.log("Hello via Bun!");

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create a new user
await prisma.user
  .create({
    data: {
      name: "John Dough",
      email: `john-${Math.random()}@example.com`,
    },
  })
  .catch((e) => {
    console.error(e);
  });

Bun.serve({
  fetch: async (request) => {
    return Response.json(await prisma.user.findMany());
  },
  port: 3000,
});

// count the number of users
const count = await prisma.user.count();
console.log(`There are ${count} users in the database.`);

console.log("eid!");

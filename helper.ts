import { $ } from "bun";

await $`bun install`;

await $`bunx prisma generate`;

// await $`bunx prisma migrate dev --name init`;

await $`docker-compose up`;

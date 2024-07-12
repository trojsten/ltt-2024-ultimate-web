# ltt-2024-ulimate-web

To run:

```bash
docker-compose up

```

## Pre Gardenera (production deployment):

Potrebujeme PostgreSQL a nastaviť `DATABASE_URL`.

```bash
DATABASE_URL=postgresql://ultimate-ltt:ultimate-ltt@db/ultimate-ltt?schema=public
```

Skoro celé repo môže byť read-only, spúšťať sa má

```bash
bun run index.ts
```

Ale potrebujeme read-write prístup k `./uploads` a `./config.json`.
V `./uploads` bude veľa videí.

Ako base image používame `oven/bun:1.1.8-slim` a program beží na porte `3000`.

V image treba ešte na začiatku pustiť `bun install` a `npx prisma migrate dev --name init`. Na tú prismu to už musí mať connection do databázy. Takže párty neviem úplne ako to spravíš. A prisma potrebuje nodejs.

### Prisma studio

Okrem toho by sme chceli bežať prisma studio ale to má bez hesla prístup k databáze. Takže to asi nechceme verejne. Takže buď pred to treba nejaké proxy s loginom alebo ak sa tam budem vedieť dostať cez `wg` tak to bude stačiť. Na prisma studio ideálne použiť `node:22.2.0-alpine3.19` a potrebuje prístup k `./prisma/schema.prisma` a node_modules. Veď tak ako v compose.

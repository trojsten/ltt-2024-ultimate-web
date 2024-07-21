#!/bin/bash

bunx prisma migrate deploy
exec bun run index.ts

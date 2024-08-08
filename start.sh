#!/bin/bash

bunx prisma migrate deploy

echo "====migrate complete====="
exec bun run index.ts

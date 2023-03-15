#!/bin/bash

npm install -g prisma
npx prisma generate
npx prisma db push
node dist/main.js

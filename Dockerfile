FROM node:alpine AS base

WORKDIR /app

COPY . .

RUN npm ci && npm run build

ENV NODE_ENV=production

CMD ["npm", "start", "--", "--host=::"]

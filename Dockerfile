FROM node:alpine AS base

WORKDIR /app

COPY . .

RUN npm install && npm run build

ENV NODE_ENV=production

CMD ["npm", "start", "--", "--host=::"]

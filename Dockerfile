FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci

# copy application files
COPY . .
RUN rm -rf ./example

RUN npm run build

CMD ["npm", "start"]

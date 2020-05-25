FROM node:12 as BASE
WORKDIR /app
COPY package*.json \
  nest-cli.json \
  tsconfig*.json \
  ./
RUN npm i
# allow ability to pass in an arg for build time changes
ARG APP_NAME="complex-sample"
COPY apps/$APP_NAME/ ./apps/$APP_NAME/
# assign passed are to env for runtime effects
ENV APP_NAME ${APP_NAME}
# use env var at runtime
CMD ["npm", "run", "test", "--", "--config", "apps/$APP_NAME/test/jest-e2e.json"]

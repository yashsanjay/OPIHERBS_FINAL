
const { Redis } = require( "@upstash/redis");
// import { REDIS_TOKEN, REDIS_URL } from "../config/index.js";

const client = new Redis({
    url: 'https://absolute-mustang-43230.upstash.io',
    token: 'AajeAAIjcDFjMzY0OTJkNTI0NGU0ZDRkOWVhZTY3YWZmMmU0YTY1MnAxMA',
});

module.exports= client;


const { Redis } = require( "@upstash/redis");
// import { REDIS_TOKEN, REDIS_URL } from "../config/index.js";

const client = new Redis({
    url: 'https://possible-poodle-51623.upstash.io',
    token: 'AcmnAAIncDE1NmQzMjJiZDY5OTU0NDA0YWQzNWJlMWYyMDA0YzUyOXAxNTE2MjM',
});

module.exports= client;

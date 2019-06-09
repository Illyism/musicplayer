import Airtable from 'airtable'

import redis from 'redis'
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '', 10),
  auth_pass: process.env.REDIS_PASSWORD,
})
const { promisify } = require('util');
const getCache = promisify(redisClient.get).bind(redisClient)
const setCache = promisify(redisClient.set).bind(redisClient)

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE || '')

async function getAllSubs() {
  return await base('Imported table').select({ view: 'Grid view' }).all()
}

export async function handler() {
  try {
    console.time('get-subs')
    const cachedBody = await getCache('musicplayer-subs')
    if (cachedBody) {
      console.log('cache hit')
      console.timeEnd('get-subs')
      return { statusCode: 200, body: cachedBody }
    }

    const allSubs = await getAllSubs()
    const rows = allSubs.map((result) => Object.assign({}, result.fields, { id: result.id }))
    const body = JSON.stringify(rows)
    await setCache('musicplayer-subs', body, 'EX', 60 * 24)
    console.log('cache miss')
    console.timeEnd('get-subs')
    return { statusCode: 200, body }
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}

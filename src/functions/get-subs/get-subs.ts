import Airtable from 'airtable'
import pako from 'pako'
import redis from 'redis'

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY || 'keyaTd6ddUH135q27' }).base('appOgTEA40adsbOV8')

async function getAllSubs() {
  return await base('Imported table').select({ view: 'Grid view' }).all()
}

export async function handler() {
  try {
    const allSubs = await getAllSubs()
    const rows = allSubs.map((result) => Object.assign({}, result.fields, { id: result.id }))
    const body = pako.deflate(JSON.stringify(rows), { to: 'string' });
    return { statusCode: 200, body }
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}

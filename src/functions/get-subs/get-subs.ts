import Airtable from 'airtable'
import redis from 'redis'

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE || '')

async function getAllSubs() {
  return await base('Imported table').select({ view: 'Grid view' }).all()
}

export async function handler() {
  try {
    const allSubs = await getAllSubs()
    const rows = allSubs.map((result) => Object.assign({}, result.fields, { id: result.id }))
    return { statusCode: 200, body: JSON.stringify(rows) }
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}

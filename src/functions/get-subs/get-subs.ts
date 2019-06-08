import Airtable from 'airtable'
const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base('appOgTEA40adsbOV8')

async function getAllSubs() {
  return await base('Imported table').select({ view: 'Grid view' }).all()
}

export async function handler() {
  try {
    const body = await getAllSubs()
    const rows = body.map((result) => Object.assign({}, result.fields, { id: result.id }))
    return { statusCode: 200, body: JSON.stringify(rows, null, 2) };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}

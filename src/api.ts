import axios from 'axios'
import pako from 'pako'

export async function getSubs(): Promise<SubredditListItem[]> {
    const res = await axios.get('/.netlify/functions/get-subs')
    const data = res.data
    const buffer = pako.inflate(data, { to: 'string' })
    const json = JSON.parse(buffer)
    return json
}
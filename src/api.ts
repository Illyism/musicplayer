import axios from 'axios'

export async function getSubs(): Promise<SubredditListItem[]> {
    const res = await axios.get('/.netlify/functions/get-subs')
    return res.data
}
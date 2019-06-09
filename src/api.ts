import axios from 'axios'
import { RawSubreddit } from './typings/reddit'

export async function getSubs(): Promise< SubredditListItem[]> {
    const res = await axios.get('/.netlify/functions/get-subs')
    return res.data
}

const BASE_REDDIT_URL = 'https://www.reddit.com'

export async function getRedditMusic(
    subs: SubredditListItem[],
    sortId: string,
    topSortId: string,
    after?: string,
    limit: number = 100,
): Promise< RawSubreddit> {
    const subsText = subs.map((s) => s.Subreddit).join('+')
    const params = {
        sort: sortId,
        t: topSortId,
        after,
        limit,
    }
    const res = await axios.get(`${BASE_REDDIT_URL}/r/${subsText}/${sortId}.json`, { params })
    return res.data
}
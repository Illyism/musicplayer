import { RawPostData } from '@/typings/reddit'
import { MP3PostData } from '@/typings/player'

export default function isMP3Type(post: RawPostData): post is MP3PostData {
    if (post.url.substr(-4) === '.mp3') {
        return true
    }

    return false
}
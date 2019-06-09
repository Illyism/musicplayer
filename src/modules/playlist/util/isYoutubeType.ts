import { RawPostData } from '@/typings/reddit'
import { YoutubePostData } from '@/typings/player'

export default function isYoutubeType(post: RawPostData): post is YoutubePostData {
    switch (post.domain) {
        case 'youtube.com':
        case 'youtu.be':
        case 'm.youtube.com':
            return true
    }
    return false
}
import { RawPostData } from '@/typings/reddit'
import { YoutubePostData } from '@/typings/player'

export default function isYoutubeType(post?: RawPostData | null): post is YoutubePostData {
    if (!post) {
        return false
    }

    switch (post.domain) {
        case 'youtube.com':
        case 'youtu.be':
        case 'm.youtube.com':
            return true
    }
    return false
}
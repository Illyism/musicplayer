
import { RawPostData } from '@/typings/reddit'
import { SoundcloudPostData } from '@/typings/player'

export default function isSoundcloudType(post?: RawPostData | null): post is SoundcloudPostData {
    if (!post) {
        return false
    }

    if (post.domain !== 'soundcloud.com') {
        return false
    }

    if (!post.media || !post.media.oembed) {
        return false
    }

    return true
}
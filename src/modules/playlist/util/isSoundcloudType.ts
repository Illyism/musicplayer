
import { RawPostData } from '@/typings/reddit'
import { SoundcloudPostData } from '@/typings/player'

export default function isSoundcloudType(post: RawPostData): post is SoundcloudPostData {
    if (post.domain === 'soundcloud.com') {
        return true
    }

    return false
}
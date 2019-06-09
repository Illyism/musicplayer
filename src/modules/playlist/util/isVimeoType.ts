
import { RawPostData } from '@/typings/reddit'
import { VimeoPostData } from '@/typings/player'

export default function isVimeoType(post: RawPostData): post is VimeoPostData {
    if (post.domain === 'vimeo.com') {
        return true
    }

    return false
}
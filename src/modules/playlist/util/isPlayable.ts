import { RawPostData } from '@/typings/reddit'
import isYoutubeType from './isYoutubeType'
import isSoundcloudType from './isSoundcloudType'
import isVimeoType from './isVimeoType'
import isMP3Type from './isMP3Type'

export default function isPlayable(post: RawPostData) {
    if (post.is_self) {
        return false
    }

    if (isYoutubeType(post)) {
        return true
    }

    if (isSoundcloudType(post)) {
        return true
    }

    if (isVimeoType(post)) {
        return true
    }

    if (isMP3Type(post)) {
        return true
    }

    return false
}
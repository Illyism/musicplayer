import { RawPostData } from '@/typings/reddit'
import getYoutubeId from './getYoutubeId';

export default function getYoutubeIdForPost(post: RawPostData | null) {
    if (!post) {
        return null
    }
    const urlId = getYoutubeId(post.url)
    if (urlId) {
        return urlId
    }

    const secureId = getYoutubeId(post.secure_media_embed.media_domain_url)
    if (secureId) {
        return secureId
    }

    return null
}
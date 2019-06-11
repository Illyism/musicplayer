import { RawPostData } from '@/typings/reddit';

export default function isPostEqual(aPost: RawPostData | null, bPost: RawPostData | null) {
    if (!aPost || !bPost) {
        return false
    }
    return aPost.id === bPost.id
}
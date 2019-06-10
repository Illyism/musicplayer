import { RawPostData } from '@/typings/reddit';

export default function isPostEqual(aPost: RawPostData, bPost: RawPostData) {
    return aPost.id === bPost.id
}
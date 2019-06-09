import { RawPostData } from '@/typings/reddit'

export default interface PlayerService {
    init: (element: HTMLElement) => void
    pause: () => void
    stop: () => void
    switchSong: (post: RawPostData) => void
}
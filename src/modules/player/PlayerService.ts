import { RawPostData } from '@/typings/reddit'

export default interface PlayerService {
    init: (element: HTMLElement) => void
    pause: () => void
    stop: () => void
    switchSong: (post: RawPostData) => void

    setVolume: (newVolume: number) => void
    mute: () => void
    unMute: () => void

    seekTo: (seconds: number, allowSeekAhead: boolean) => void
}
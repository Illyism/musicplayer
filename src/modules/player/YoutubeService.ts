
import initYoutubePlayer from 'youtube-player'
import { YouTubePlayer } from 'youtube-player/dist/types'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'

class YoutubeService {
    /** @see https://github.com/gajus/youtube-player */
    public player: YouTubePlayer | null = null

    public initYoutube(element: HTMLElement) {
        this.player = initYoutubePlayer(element)
        this.player.on('ready', () => {
            console.log('ready')
        })

        this.player.on('error', () => {
            console.log('error')
        })

        this.player.on('stateChange', async () => {
            const newState = await this.player!.getPlayerState()
            switch (newState) {
                case PlayerStates.UNSTARTED: console.log('UNSTARTED'); break;
                case PlayerStates.PLAYING: console.log('PLAYING'); break;
                case PlayerStates.PAUSED: console.log('PAUSED'); break;
                case PlayerStates.ENDED: console.log('ENDED'); break;
                case PlayerStates.VIDEO_CUED: console.log('VIDEO_CUED'); break;
                case PlayerStates.BUFFERING: console.log('BUFFERING'); break;
                default: console.log('unknown state', newState)
            }
        })
    }
}


export default new YoutubeService()
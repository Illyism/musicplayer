
import initYoutubePlayer from 'youtube-player'
import { YouTubePlayer } from 'youtube-player/dist/types'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import { YoutubePostData } from '@/typings/player';
import getYoutubeIdForPost from '../playlist/util/getYoutubeIdForPost';

class YoutubeService {
    /** @see https://github.com/gajus/youtube-player */
    public player: YouTubePlayer | null = null

    public initYoutube(element: HTMLElement) {
        this.player = initYoutubePlayer(element)
        this.player.on('ready', () => {
            console.log('ready')
        })

        this.player.on('error', (e) => {
            console.log('error', e)
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

    public switchSong(post: YoutubePostData) {
        if (!this.player) {
            return
        }
        const id = getYoutubeIdForPost(post)
        if (!id) {
            console.log('could not find id')
            return
        }
        this.player.loadVideoById(id)
    }

    public pause() {
        if (!this.player) {
            return
        }
        this.player.stopVideo()
    }
}


export default new YoutubeService()
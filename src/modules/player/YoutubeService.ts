
import initYoutubePlayer from 'youtube-player'
import { YouTubePlayer } from 'youtube-player/dist/types'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import getYoutubeIdForPost from '../playlist/util/getYoutubeIdForPost';
import PlayerService from './PlayerService'
import { sleep } from '@/utils'
import store from '@/store';
import isYoutubeType from '../playlist/util/isYoutubeType';

class YoutubeService implements PlayerService {
    /** @see https://github.com/gajus/youtube-player */
    public player: YouTubePlayer | null = null

    public init(element: HTMLElement) {
        this.player = initYoutubePlayer(element, {
            videoId: 'hi4pzKvuEQM',
            playerVars: {
                autoplay: 1,
                enablejsapi: 1,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3,
                origin: window.location.origin,
            },
        })
        this.player.on('ready', () => {
            store.commit('SET_PLAYER_READY')
        })

        this.player.on('error', (e) => {
            console.log('error', e)
        })

        this.player.on('stateChange', async () => {
            const newState = await this.player!.getPlayerState()
            store.commit('SET_PLAYER_STATE', newState)
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

    public switchSong() {
        const post = store.state.activePost
        if (!isYoutubeType(post)) {
            return
        }

        if (!this.player) {
            return
        }

        const id = getYoutubeIdForPost(post)
        if (!id) {
            return
        }

        this.player.loadVideoById(id)
        this.playUntilStarted()
    }

    public pause() {
        if (!this.player) {
            return
        }
        this.player.pauseVideo()
    }

    public stop() {
        if (!this.player) {
            return
        }
        this.player.stopVideo()
    }

    /**
     * Keeps attempting to play the song
     * Will attempt playback increasingly
     * - 1,2,4,8,16,32 sec
     * - 1,2,4,8,17,34,68,128,... min
     *
     *
     * This because the player might be in a background tab
     * and this service was ordered to play, so it must play eventually
     */
    private async playUntilStarted(i = 1) {
        if (!this.player) {
            return
        }

        const playerState = await this.player.getPlayerState()
        if (playerState === PlayerStates.PLAYING) {
            return
        }

        this.player.playVideo()

        await sleep(1000 * i)
        this.playUntilStarted(i * 2)
    }
}


export default new YoutubeService()
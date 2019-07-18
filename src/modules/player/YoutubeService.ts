
import initYoutubePlayer from 'youtube-player'
import { YouTubePlayer } from 'youtube-player/dist/types'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import getYoutubeIdForPost from '../playlist/util/getYoutubeIdForPost';
import PlayerService from './PlayerService'
import store from '@/store';
import isYoutubeType from '../playlist/util/isYoutubeType';
import StoreListener from '@/utils/StoreListener';
import PlaylistController from '../playlist/PlaylistController';

class YoutubeService extends StoreListener implements PlayerService {
    /** @see https://github.com/gajus/youtube-player */
    public player?: YouTubePlayer

    protected on = {
        SET_PLAYER_STATE: this.onPlayerStateChanged,
    }

    private interval?: number

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

        this.player.on('error', (err) => {
            store.dispatch('POST_PLAY_ERROR', err)
        })

        this.player.on('stateChange', async () => {
            const newState = await this.player!.getPlayerState()
            store.dispatch('SET_PLAYER_STATE', newState)
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

    public async beforeDestroy() {
        this.stopIntervalProgressWatchers()
        if (!this.player) {
            return
        }
        await this.player.destroy()
    }

    public async switchSong() {
        if (!this.isYoutubePlaying) {
            return
        }

        if (!this.player) {
            return
        }

        const post = store.state.activePost
        const id = getYoutubeIdForPost(post!)
        if (!id) {
            return
        }

        await this.player.loadVideoById(id)
        await this.play()
    }

    public async pause() {
        if (!this.player) {
            return
        }
        await this.player.pauseVideo()
    }

    public async play() {
        if (!this.player) {
            return
        }
        await this.player.playVideo()
    }

    public async stop() {
        if (!this.player) {
            return
        }
        await this.player.stopVideo()
    }

    public async setVolume(newVolume: number) {
        if (!this.player) {
            return
        }
        await this.player.setVolume(newVolume)
    }

    public async mute() {
        if (!this.player) {
            return
        }
        await this.player.mute()
    }

    public async unMute() {
        if (!this.player) {
            return
        }
        await this.player.unMute()
    }

    private get isYoutubePlaying() {
        const post = store.state.activePost
        return isYoutubeType(post)
    }

    private async startIntervalProgressWatchers() {
        if (!this.player) {
            return
        }
        if (this.interval) {
            return
        }

        // set the volume on the youtube iframe based on our preferred volume
        await this.player.setVolume(store.state.volume)

        // get the duration, current time and loaded time
        store.dispatch('SET_PROGRESS_DURATION', await this.player.getDuration()) // secs
        this.updateProgressState()

        // and continue updating every 500ms, because there are no events to watch
        this.interval = window.setInterval(() => this.updateProgressState(), 500)
    }

    private async updateProgressState() {
        if (!this.player) {
            return
        }
        store.dispatch('SET_PROGRESS_CURRENT', await this.player.getCurrentTime()) // secs
        store.dispatch('SET_PROGRESS_LOADED', await this.player.getVideoLoadedFraction()) // %
    }

    private stopIntervalProgressWatchers() {
        if (!this.interval) {
            return
        }
        window.clearInterval(this.interval)
        this.interval = undefined
    }

    // events
    private async onPlayerStateChanged() {
        if (store.getters.isPlaying) {
            if (!this.isYoutubePlaying) {
                return
            }

            this.startIntervalProgressWatchers()
        } else {
            this.stopIntervalProgressWatchers()
        }
    }
}


export default new YoutubeService()
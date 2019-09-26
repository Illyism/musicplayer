
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import PlayerService from './PlayerService'
import store from '@/store'
import StoreListener from '@/utils/StoreListener'
import isSoundcloudType from '../playlist/util/isSoundcloudType'
import { getSoundcloudTrack } from '../playlist/util/getSoundcloudTrack'
import { SoundcloudTrack, SoundcloudProgressData } from '@/typings/soundcloud'

declare let SC: any; // Magic

class SoundcloudService extends StoreListener implements PlayerService {
    /** @see https://github.com/gajus/youtube-player */
    public player?: any
    public soundCloudTrack?: SoundcloudTrack

    public init(element: HTMLElement, attempts = 0) {
        if (this.player) {
            return
        }

        if (!SC) {
            if (attempts >= 10) {
                throw new Error('Could not init soundcloud after 10 attempts')
            }
            // not yet ready, try again
            attempts++
            setTimeout(() => {
                this.init(element)
            }, 1000 * attempts)
            return
        }

        this.player = SC.Widget(element)

        this.player.bind(SC.Widget.Events.PLAY_PROGRESS, this.onPlayerProgress.bind(this))
        this.player.bind(SC.Widget.Events.PLAY, this.onPlayerPlay.bind(this))
        this.player.bind(SC.Widget.Events.PAUSE, this.onPlayerPause.bind(this))
        this.player.bind(SC.Widget.Events.FINISH, this.onPlayerFinish.bind(this))
        this.player.bind(SC.Widget.Events.READY, this.onPlayerReady.bind(this))
        this.player.bind(SC.Widget.Events.ERROR, this.onPlayerError.bind(this))
    }

    public beforeDestroy() {
        console.log('SoundcloudService :: beforeDestroy')
        this.player.unbind(SC.Widget.Events.PLAY_PROGRESS)
        this.player.unbind(SC.Widget.Events.PLAY)
        this.player.unbind(SC.Widget.Events.PAUSE)
        this.player.unbind(SC.Widget.Events.FINISH)
        this.player.unbind(SC.Widget.Events.READY)
        this.player.unbind(SC.Widget.Events.ERROR)
        delete this.player
    }


    public async switchSong() {
        if (!this.isSoundcloudPlaying) {
            return
        }

        if (!this.player) {
            return
        }

        const post = store.state.activePost

        try {
            this.soundCloudTrack = await getSoundcloudTrack(post)
            if (!this.soundCloudTrack.uri) {
                throw new Error('Could not play soundcloud track: ' + this.soundCloudTrack.uri)
            }
            await this.player.load(this.soundCloudTrack.uri, {
                auto_play: true,
                visual: true,
            })
        } catch (err) {
            store.dispatch('POST_PLAY_ERROR', err)
        }
    }

    public async pause() {
        if (!this.player) {
            return
        }
        await this.player.pause()
    }

    public async play() {
        if (!this.player) {
            return
        }
        await this.player.play()
    }

    public async stop() {
        if (!this.player) {
            return
        }
        await this.player.pause()
    }

    public async setVolume(newVolume: number) {
        if (!this.player) {
            return
        }
        await this.player.setVolume(newVolume * 100)
    }

    public async mute() {
        await this.setVolume(0)
    }

    public async unMute() {
        await this.setVolume(store.state.volume)
    }

    public async seekTo(seconds: number) {
        if (!this.player) {
            return
        }
        await this.player.seekTo(seconds * 1000) // in ms
    }

    private get isSoundcloudPlaying() {
        const post = store.state.activePost
        return isSoundcloudType(post)
    }

    private async syncPlayerState() {
        await this.player.setVolume(store.state.volume) // didn't work on ready event
        await this.player.getDuration((duration: number) => {
            store.dispatch('SET_PROGRESS_DURATION', duration / 1000) // secs
        })
    }

    // listening to player events
    private onPlayerProgress({ currentPosition, loadedProgress }: SoundcloudProgressData) {
        store.dispatch('SET_PROGRESS_CURRENT', currentPosition / 1000) // secs
        store.dispatch('SET_PROGRESS_LOADED', loadedProgress) // %
    }

    private onPlayerPlay() {
        this.syncPlayerState()
        store.dispatch('SET_PLAYER_STATE', PlayerStates.PLAYING)
    }

    private onPlayerPause() {
        this.syncPlayerState()
        store.dispatch('SET_PLAYER_STATE', PlayerStates.PAUSED)
    }

    private onPlayerFinish() {
        this.player.getCurrentSoundIndex((index: number) => {
            if (!this.soundCloudTrack) {
                return
            }

            // 199 = The embed player has a maximum of 199 tracks
            // But the amount of tracks returned in the API call can be higher

            if (
                this.soundCloudTrack.kind === 'track' ||
                index >= this.soundCloudTrack.track_count - 1 ||
                index >= 199) {
                store.dispatch('SET_PLAYER_STATE', PlayerStates.ENDED)
            } else {
                store.dispatch('SET_PLAYER_STATE', PlayerStates.PAUSED)
            }
        })
    }

    private onPlayerReady() {
        store.commit('SET_PLAYER_READY')
    }

    private onPlayerError(err: Error) {
        store.dispatch('POST_PLAY_ERROR', err)
    }
}


export default new SoundcloudService()
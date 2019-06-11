import store, { State } from '@/store'
import isYoutubeType from '../playlist/util/isYoutubeType';
import YoutubeService from './YoutubeService';
import PlayerService from './PlayerService';
import isSoundcloudType from '../playlist/util/isSoundcloudType';
import isVimeoType from '../playlist/util/isVimeoType';
import isMP3Type from '../playlist/util/isMP3Type';
import StoreListener from '@/utils/StoreListener';

class PlayersController extends StoreListener {
    protected on = {
        SET_ACTIVE_POST: this.onPostChanged,
        SET_PLAYER_READY: this.switchSong,
    }
    private services: PlayerService[] = [ YoutubeService ]

    public pause() {
        if (!this.activeService) {
            return
        }
        this.stopAllExcept(this.activeService)
        this.activeService.pause()
    }

    public play() {
        if (!this.activeService) {
            return
        }
        this.stopAllExcept(this.activeService)
        this.activeService.play()
    }

    public switchSong() {
        if (!this.activeService) {
            return
        }
        this.stopAllExcept(this.activeService)
        this.activeService.switchSong()
    }

    private get activeService() {
        const post = store.state.activePost
        if (!post) {
            return
        }

        if (isYoutubeType(post)) {
            return YoutubeService
        }

        if (isSoundcloudType(post)) {
            console.log('soundcloud player missing')
            return
        }

        if (isVimeoType(post)) {
            console.log('vimeo player missing')
            return
        }

        if (isMP3Type(post)) {
            console.log('mp3 player missing')
            return
        }
    }

    private forAllServiceExcept(currentService: PlayerService, action: (service: PlayerService) => void) {
        for (const service of this.services) {
            if (service === currentService) {
                continue
            }

            action(service)
        }
    }

    private stopAllExcept(currentService: PlayerService) {
        this.forAllServiceExcept(currentService, (service) => service.stop())
    }

    private onPostChanged(state: State) {
        if (!state.playerReady) {
            return
        }

        const activePost = state.activePost
        if (!activePost) {
            this.pause()
            return
        }
        this.switchSong()
    }
}

export default new PlayersController()
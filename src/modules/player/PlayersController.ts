import store, { State } from '@/store'
import { RawPostData } from '@/typings/reddit'
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
    }
    private services: PlayerService[] = [ YoutubeService ]

    public pause() {
        YoutubeService.pause()
    }

    public switchSong(post: RawPostData) {
        if (isYoutubeType(post)) {
            YoutubeService.switchSong(post)
            this.stopAllExcept(YoutubeService)
            return
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
        const activePost = state.activePost
        if (!activePost) {
            this.pause()
            return
        }
        this.switchSong(activePost)
    }
}

export default new PlayersController()
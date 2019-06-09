import store, { State } from '@/store'
import { MutationPayload } from 'vuex'
import { RawPostData } from '@/typings/reddit'
import isYoutubeType from '../playlist/util/isYoutubeType';
import YoutubeService from './YoutubeService';
import PlayerService from './PlayerService';
import isSoundcloudType from '../playlist/util/isSoundcloudType';
import isVimeoType from '../playlist/util/isVimeoType';
import isMP3Type from '../playlist/util/isMP3Type';

class PlayersController {
    private services: PlayerService[] = [ YoutubeService ]

    constructor() {
        store.subscribe(this.onStoreMutation.bind(this))
    }

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

    private onPostChanged(activePost: RawPostData | null) {
        if (!activePost) {
            this.pause()
            return
        }
        this.switchSong(activePost)
    }

    private onStoreMutation({ type }: MutationPayload, state: State) {
        switch (type) {
            case 'SET_ACTIVE_POST':
                this.onPostChanged(state.activePost)
        }
    }
}

export default new PlayersController()
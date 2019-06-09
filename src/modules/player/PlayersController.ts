import store, { State } from '@/store'
import { MutationPayload } from 'vuex'
import { RawPostData } from '@/typings/reddit'
import isYoutubeType from '../playlist/util/isYoutubeType';
import YoutubeService from './YoutubeService';

class PlayersController {
    constructor() {
        store.subscribe(this.onStoreMutation.bind(this))
    }

    public pause() {
        YoutubeService.pause()
    }

    public switchSong(post: RawPostData) {
        if (isYoutubeType(post)) {
            YoutubeService.switchSong(post)
        }
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
import StoreListener from '@/utils/StoreListener';
import store, { State } from '@/store';
import { getRedditMusic } from '@/api';
import isPlayable from './util/isPlayable';

class PlaylistController extends StoreListener {
    protected on = {
        ADD_ACTIVE_SUB: this.onActiveSubsChanged,
        SET_ACTIVE_SUBS: this.onActiveSubsChanged,
        REMOVE_ACTIVE_SUB: this.onActiveSubsChanged,
        SET_ACTIVE_SORT: this.onActiveSubsChanged,
        SET_ACTIVE_TOP_SORT: this.onActiveSubsChanged,
    }

    public async getMusic(state: State = store.state) {
        const result = await getRedditMusic(
            state.activeSubs,
            state.activeSort,
            state.activeTopSort,
        )

        const songs = result.data.children.map((d) => d.data).filter(isPlayable)

        store.commit('SET_REDDIT_MUSIC', songs)
    }

    private async onActiveSubsChanged(state: State) {
        this.getMusic(state)
    }
}

export default new PlaylistController()
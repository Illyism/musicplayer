import StoreListener from '@/utils/StoreListener';
import store, { State } from '@/store';
import { getRedditMusic } from '@/api';
import isPlayable from './util/isPlayable';
import { RawPostData } from '@/typings/reddit';
import isPostEqual from './util/isPostEqual';
import PlayersController from '../player/PlayersController';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

class PlaylistController extends StoreListener {
    protected on = {
        ADD_ACTIVE_SUB: this.onActiveSubsChanged,
        SET_ACTIVE_SUBS: this.onActiveSubsChanged,
        REMOVE_ACTIVE_SUB: this.onActiveSubsChanged,
        SET_ACTIVE_SORT: this.onActiveSubsChanged,
        SET_ACTIVE_TOP_SORT: this.onActiveSubsChanged,
    }

    /**
     * On app start, load all the songs and play the first one
     */
    public async init() {
        await this.getMusic()
        const firstSong = store.state.redditMusic[0]
        await this.playSong(firstSong)
    }

    /**
     * Plays a song
     */
    public playSong(post: RawPostData) {
        store.dispatch('PLAY_POST', post)
    }

    /**
     * Plays a new song, or pauses current song
     */
    public toggleSong(post: RawPostData) {
        if (isPostEqual(store.state.activePost, post)) {
            if (store.state.playerState === PlayerStates.PLAYING) {
                PlayersController.pause()
            } else {
                PlayersController.play()
            }
            return
        }
        store.dispatch('PLAY_POST', post)
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
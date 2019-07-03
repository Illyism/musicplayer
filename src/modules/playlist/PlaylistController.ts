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
        SET_PLAYER_STATE: this.onPlayerStateChanged,
    }

    /**
     * On app start, load all the songs and play the first one
     */
    public async init() {
        await this.getMusic()
        this.playFirstSong()
    }

    /**
     * Plays a song
     */
    public loadSong(post: RawPostData) {
        store.dispatch('PLAY_POST', post)
        this.getMoreMusicIfPlaylistEnding()
    }

    /**
     * Plays a new song, or pauses current song
     */
    public toggleSong(post: RawPostData) {

        // if we clicked on the current post, just play or pause it
        if (isPostEqual(store.state.activePost, post)) {
            if (store.state.playerState === PlayerStates.PLAYING) {
                PlayersController.pause()
            } else {
                PlayersController.play()
            }

            return
        }

        this.loadSong(post)
    }

    public async getMusic({ activeSubs, activeSort, activeTopSort }: State = store.state) {
        if (!activeSubs.length) {
            console.error('called getMusic without activeSubs')
            return
        }

        const result = await getRedditMusic(
            activeSubs,
            activeSort,
            activeTopSort,
        )

        const songs = result.data.children.map((d) => d.data).filter(isPlayable)

        store.commit('SET_REDDIT_MUSIC', songs)
    }

    public async playNextSong() {
        const nextSong = store.getters.nextSong
        if (!nextSong) {
            console.error('No nextSong to play')
            return
        }

        this.loadSong(nextSong)
    }

    public async playPrevSong() {
        const prevSong = store.getters.prevSong
        if (!prevSong) {
            console.error('No prevSong to play')
            return
        }

        this.loadSong(prevSong)
    }

    private async getMoreMusic({ redditMusic, activeSubs, activeSort, activeTopSort }: State = store.state) {
        const lastSong = redditMusic[redditMusic.length - 1]
        if (!lastSong) {
            console.error('No lastSong available to get more music')
            return
        }

        const result = await getRedditMusic(
            activeSubs,
            activeSort,
            activeTopSort,
            lastSong.name,
        )

        const newSongs = result.data.children.map((d) => d.data).filter(isPlayable)

        // leave the current visible songs
        const currentSongs = store.getters.playlist
        const newPlaylist = currentSongs.concat(newSongs)

        store.commit('SET_REDDIT_MUSIC', newPlaylist)
    }

    private async getMoreMusicIfPlaylistEnding() {
        // should we load more songs? Check if our playlist is running out
        const currentIndex = store.getters.currentIndex
        const songsCount = store.state.redditMusic.length
        if (currentIndex >= songsCount - 6) { // first column of previous row
            this.getMoreMusic()
        }
    }

    private async playFirstSong({ redditMusic }: State = store.state) {
        const firstSong = redditMusic[0]
        if (!firstSong) {
            console.error('No firstSong to play')
            return
        }

        await this.loadSong(firstSong)
    }


    // events
    private async onActiveSubsChanged(state: State) {
        this.getMusic(state)
    }

    private async onSongEnded() {
        this.playNextSong()
        this.getMoreMusic()
    }

    private async onPlayerStateChanged({ playerState }: State) {
        if (playerState === PlayerStates.ENDED) {
            this.onSongEnded()
        }
    }
}

export default new PlaylistController()
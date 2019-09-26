import { getSubs } from '@/api';
import { RawPostData } from '@/typings/reddit';
import keyBy from 'lodash/keyBy';
import Vue from 'vue';
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex';
import VuexPersistence from 'vuex-persist';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

Vue.use(Vuex)

export interface State {
  subs: SubredditListItem[];
  subsLoaded: boolean;
  activeSubs: SubredditListItem[];
  activeSort: 'hot'|'top'|'new';
  activeTopSort: 'hour'|'day'|'week'|'month'|'year'|'all';
  redditMusic: RawPostData[];
  activePost: RawPostData | null;
  playerState: PlayerStates;
  playerReady: boolean;
  volume: number; // from 0 to 100
  isMuted: boolean;
  progressDuration: number;
  progressCurrent: number;
  progressLoaded: number;
  isMenuOpen: boolean;
  isHorizontalOrientation: boolean;
  isPlaylistExpanded: false;
}


export const defaultState: State = {
  subs: [],
  subsLoaded: false ,
  activeSubs: [],
  activeSort: 'hot',
  activeTopSort: 'month',
  redditMusic: [],
  activePost: null,
  playerState: PlayerStates.UNSTARTED,
  playerReady: false ,
  volume: 100,
  isMuted: false ,
  progressDuration: 1,
  progressCurrent: 0,
  progressLoaded: 0,
  isMenuOpen: true,
  isHorizontalOrientation: true,
  isPlaylistExpanded: false,
}


const vuexLocal = new VuexPersistence< State>({
  storage: window.localStorage,
  reducer: ({ activeSort, activeTopSort, activeSubs, subs, volume, isMuted, isPlaylistExpanded }) =>
           ({ activeSort, activeTopSort, activeSubs, subs, volume, isMuted, isPlaylistExpanded }),
  filter: (mutation) => {
    switch (mutation.type) {
      case 'SET_ACTIVE_SORT':
      case 'SET_ACTIVE_TOP_SORT':
      case 'ADD_ACTIVE_SUB':
      case 'REMOVE_ACTIVE_SUB':
      case 'STORE_SUBS':
      case 'SET_VOLUME':
      case 'SET_MUTE_STATE':
      case 'SET_PLAYLIST_EXPANDED':
        return true
      default:
        return false
    }
  },
})

const defaultGetters: GetterTree< State, any> = {
  activeSubsMap({ activeSubs }) {
    return keyBy(activeSubs, 'Subreddit')
  },
  subsMap({ subs }) {
    return keyBy(subs, 'Subreddit')
  },
  currentIndex({ redditMusic, activePost }) {
    return activePost ? redditMusic.indexOf(activePost) : -1
  },
  prevSong({ redditMusic }, { currentIndex }) {
    return redditMusic[currentIndex - 1]
  },
  nextSong({ redditMusic }, { currentIndex }) {
    return redditMusic[currentIndex + 1]
  },
  playlist({ redditMusic, isPlaylistExpanded }, { currentIndex }) {
    // amount of posts to show in the playlist before and after the current song
    const SONGS_IN_PLAYLIST = isPlaylistExpanded ? 9 : 3
    const SONGS_BEFORE_AFTER = (SONGS_IN_PLAYLIST - 1) / 2

    const playlistCutoffStart = Math.max(0, currentIndex - SONGS_BEFORE_AFTER)
    return redditMusic.slice(playlistCutoffStart, playlistCutoffStart + SONGS_IN_PLAYLIST)
  },
  isPlaying({ playerState }) {
    return playerState === PlayerStates.PLAYING
  },
}

const mutationsTree: MutationTree< State> = {
  STORE_SUBS(state, subs) {
    state.subs = subs
  },
  SET_SUBS_LOADED(state, isLoaded) {
    state.subsLoaded = isLoaded
  },
  ADD_ACTIVE_SUB(state, sub) {
    state.activeSubs.push(sub)
  },
  SET_ACTIVE_SUBS(state, subs) {
    state.activeSubs = subs
  },
  REMOVE_ACTIVE_SUB(state, { index, sub }) {
    if (sub && typeof index === 'undefined') {
      index = state.activeSubs.indexOf(sub)
    }
    state.activeSubs.splice(index, 1)
  },
  SET_ACTIVE_SORT(state, sortId) {
    state.activeSort = sortId
  },
  SET_ACTIVE_TOP_SORT(state, sortId) {
    state.activeTopSort = sortId
  },
  SET_REDDIT_MUSIC(state, songs) {
    state.redditMusic = songs
  },
  SET_ACTIVE_POST(state, post) {
    state.activePost = post
  },
  SET_PLAYER_STATE(state, playerState) {
    state.playerState = playerState
  },
  SET_PLAYER_READY(state) {
    state.playerReady = true
  },
  SET_VOLUME(state, currentVolume: number) {
    state.volume = currentVolume
  },
  SET_MUTE_STATE(state, isMuted: boolean) {
    state.isMuted = isMuted
  },
  SET_PROGRESS_DURATION(state, timeInSecs) {
    state.progressDuration = timeInSecs
  },
  SET_PROGRESS_CURRENT(state, timeInSecs) {
    state.progressCurrent = timeInSecs
  },
  SET_PROGRESS_LOADED(state, loadedPercentage) {
    state.progressLoaded = loadedPercentage
  },
  SET_MENU_OPEN_STATE(state, isMenuOpen) {
    state.isMenuOpen = isMenuOpen
  },
  SET_ORIENTATION(state, isHorizontalOrientation) {
    state.isHorizontalOrientation = isHorizontalOrientation
  },
  REMOVE_POST(state, post) {
    const postIndex = state.redditMusic.indexOf(post)
    if (postIndex > -1) {
      state.redditMusic.splice(postIndex, 1)
    }
  },
  SET_PLAYLIST_EXPANDED(state, isPlaylistExpanded) {
    state.isPlaylistExpanded = isPlaylistExpanded
  },
}

const actionsTree: ActionTree< State, State> = {
  async FETCH_SUBS({ commit, state, getters }) {
    if (state.subs.length === 0) {
      commit('SET_SUBS_LOADED', false )
      const allSubs = await getSubs()
      commit('STORE_SUBS', allSubs)
    }

    const activeSubs = []
    for (const oldActiveSub of state.activeSubs) {
      if (!oldActiveSub || !oldActiveSub.Subreddit) {
        continue
      }
      activeSubs.push(getters.subsMap[oldActiveSub.Subreddit])
    }
    commit('SET_ACTIVE_SUBS', activeSubs)

    if (!activeSubs.length) {
      commit('ADD_ACTIVE_SUB', getters.subsMap.listentothis)
    }

    commit('SET_SUBS_LOADED', true)
  },
  TOGGLE_ACTIVE_SUB({ commit, state }, sub) {
    const index = state.activeSubs.indexOf(sub)
    if (index === -1) {
      commit('ADD_ACTIVE_SUB', sub)
      return
    }
    commit('REMOVE_ACTIVE_SUB', { index, sub })
  },
  SET_ACTIVE_SORT({ commit }, sort: SortMethod) {
    commit('SET_ACTIVE_SORT', sort.id)
  },
  SET_ACTIVE_TOP_SORT({ commit }, sort: TopSortMethod) {
    commit('SET_ACTIVE_TOP_SORT', sort.id)
  },
  PLAY_POST({ commit }, post: RawPostData) {
    commit('SET_ACTIVE_POST', post)
  },
  SET_PLAYER_STATE({ commit }, playerState) {
    commit('SET_PLAYER_STATE', playerState)
  },
  SET_VOLUME({ commit }, currentVolume: number) {
    commit('SET_VOLUME', currentVolume)
  },
  SET_MUTE_STATE({ commit }, isMuted: boolean) {
    commit('SET_MUTE_STATE', isMuted)
  },
  SET_PROGRESS_DURATION({ commit }, timeInSecs) {
    commit('SET_PROGRESS_DURATION', timeInSecs)
  },
  SET_PROGRESS_CURRENT({ commit }, timeInSecs) {
    commit('SET_PROGRESS_CURRENT', timeInSecs)
  },
  SET_PROGRESS_LOADED({ commit }, loadedPercentage) {
    commit('SET_PROGRESS_LOADED', loadedPercentage)
  },
  SET_MENU_OPEN_STATE({ commit }, isMenuOpen) {
    commit('SET_MENU_OPEN_STATE', isMenuOpen)
  },
  SET_ORIENTATION({ commit }, isHorizontalOrientation) {
    commit('SET_ORIENTATION', isHorizontalOrientation)
  },
  POST_PLAY_ERROR({ commit, state, getters, dispatch }, err) {
    const offendingPost = state.activePost
    const nextSong = getters.nextSong
    if (offendingPost) {
      commit('REMOVE_POST', offendingPost)
    }
    dispatch('PLAY_POST', nextSong)
    console.log('POST_PLAY_ERROR', { err })
  },
  TOGGLE_PLAYLIST_EXPANDED({ commit, state }) {
    commit('SET_PLAYLIST_EXPANDED', !state.isPlaylistExpanded)
  },
}

export default new Vuex.Store< State>({
  plugins: [vuexLocal.plugin],
  state: defaultState,
  getters: defaultGetters,
  mutations: mutationsTree,
  actions: actionsTree,
})

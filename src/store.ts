import Vue from 'vue'
import Vuex, { GetterTree } from 'vuex'
import { getSubs } from '@/api'
import VuexPersistence from 'vuex-persist'
import keyBy from 'lodash/keyBy'

Vue.use(Vuex)

export interface State {
  subs: SubredditListItem[]
  subsLoaded: boolean
  activeSubs: SubredditListItem[]
  activeSort: 'hot'|'top'|'new'
  activeTopSort: 'h'|'d'|'m'|'y'|'a'
}


export const defaultState: State = {
  subs: [],
  subsLoaded: false ,
  activeSubs: [],
  activeSort: 'hot',
  activeTopSort: 'm',
}


const vuexLocal = new VuexPersistence< State>({
  storage: window.localStorage,
  reducer: ({ activeSort, activeTopSort, activeSubs }) => ({ activeSort, activeTopSort, activeSubs }),
  filter: (mutation) => {
    switch (mutation.type) {
      case 'SET_ACTIVE_SORT':
      case 'SET_ACTIVE_TOP_SORT':
      case 'ADD_ACTIVE_SUB':
      case 'REMOVE_ACTIVE_SUB':
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
}

export default new Vuex.Store< State>({
  plugins: [vuexLocal.plugin],
  state: defaultState,
  getters: defaultGetters,
  mutations: {
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
  },
  actions: {
    async FETCH_SUBS({ commit, state, getters }) {
      commit('SET_SUBS_LOADED', false )
      const allSubs = await getSubs()
      commit('STORE_SUBS', allSubs)

      const activeSubs = []
      for (const oldActiveSub of state.activeSubs) {
        activeSubs.push(getters.subsMap[oldActiveSub.Subreddit])
      }
      commit('SET_ACTIVE_SUBS', activeSubs)

      // find default subs
      if (!getters.activeSubsMap.listentothis) {
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
  },
});

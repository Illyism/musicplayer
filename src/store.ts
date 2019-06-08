import Vue from 'vue'
import Vuex from 'vuex'
import { getSubs } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    subs: [],
    subsLoaded: false,
    activeSubs: [] as SubredditListItem[],
  },
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
    REMOVE_ACTIVE_SUB(state, { index, sub }) {
      if (sub && typeof index === 'undefined') {
        index = state.activeSubs.indexOf(sub)
      }
      state.activeSubs.splice(index, 1)
    },
  },
  actions: {
    async FETCH_SUBS({ commit }) {
      commit('SET_SUBS_LOADED', false)
      const allSubs = await getSubs()
      commit('STORE_SUBS', allSubs)

      // find default subs
      for (const sub of allSubs) {
        if (sub.Subreddit === 'listentothis') {
          commit('ADD_ACTIVE_SUB', sub)
        }
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
  },
});

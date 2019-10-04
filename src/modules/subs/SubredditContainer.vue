<template>
  <div
    v-if="subsLoaded"
    class="pl-2"
  >
    <div
      class="h-24 w-24 p-2 rounded border border-gray-800 bg-gray-900 text-white flex flex-col justify-end cursor-pointer trans hover:border-primary-800"
      @click="openMenu"
    >
      {{ activeSubs.length }} active channels
    </div>

    <PortalWithFade
      :isMenuOpen="isMenuOpen"
    >
      <div
        class="fixed inset-0 px-2 py-12 z-30 bg-overlay-floating" 
        @click="closeMenu"
      >
        <div
          class="w-full h-full max-w-xl mx-auto pointer-events-auto shadow-xl rounded-lg bg-gray-900 flex flex-col"
          @click.prevent.stop=""
        >
          <div class="flex items-center justify-between pl-6 pr-2 bg-gray-800 rounded-t-lg">
            <div class="text-lg text-gray-100 font-medium py-2">
              Channels
            </div>
            <div
              class="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded text-gray-100 cursor-pointer"
              @click="closeMenu"
            >
              <IconClose class="" />
            </div>
          </div>
          <div class="overflow-y-scroll p-4">
            <GridLayout
              :list="activeSubs"
              class="mb-8"
              :is-animated="true"
            >
              <BottomCard
                slot-scope="{ item }"
                :title="item.Subreddit"
                :description="item.Genre"
                :is-active="true"
                @onClick="toggleActiveSub(item)"
              />
            </GridLayout>
            <div class="text-gray-100 font-light text-sm mx-2 mb-2">
              All channels
            </div>

            <div class="mx-2 mb-2">
              <div class="w-full relative">
                <input
                  v-model="subredditSearch"
                  class="bg-gray-900 text-gray-200 pr-16 text-xs w-full rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-primary-500 focus:text-gray-100"
                  placeholder="Search for subreddits..."
                  type="text"
                  autocomplete="off"
                  autocorrect="off"
                >
                <div class="absolute right-0 inset-y-0 mr-4 text-gray-700 flex items-center justify-center pointer-events-none">
                  <IconMagnify class="" />
                </div>
              </div>
            </div>

            <GridLayout
              :list="inactiveSubs"
              :is-animated="true"
            >
              <BottomCard
                slot-scope="{ item }"
                :title="item.Subreddit"
                :description="item.Genre"
                @onClick="toggleActiveSub(item)"
              />
            </GridLayout>
          </div>
        </div>
      </div>
    </PortalWithFade>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import GridLayout from '@/layouts/GridLayout.vue'
import LoadingCardGrid from '@/components/loading/LoadingCardGrid.vue'
import BottomCard from '@/components/BottomCard.vue'
import { Dictionary } from 'lodash';
import { State, Getter, Action } from 'vuex-class'
import PortalWithFade from '@/components/PortalWithFade.vue'

@Component({
  components: {
    GridLayout,
    LoadingCardGrid,
    BottomCard,
    PortalWithFade,
  },
  computed: {
    ...mapState(['subsLoaded', 'subs', 'activeSubs']),
  },
})
export default class SubredditContainer extends Vue {
  @State public subsLoaded!: boolean
  @State public subs!: SubredditListItem[]
  @State public activeSubs!: SubredditListItem[]
  @Getter public activeSubsMap!: Dictionary< SubredditListItem >
  @Action public FETCH_SUBS!: () => void

  public subredditSearch = ''

  public isMenuOpen = false
  public openMenu() {
    this.isMenuOpen = true
  }
  public closeMenu() {
    this.isMenuOpen = false
  }


  private created() {
    this.FETCH_SUBS()
  }

  private isSubVisible(sub: SubredditListItem) {
    if (this.activeSubsMap[sub.Subreddit]) {
      return false // is active
    }

    if (this.subredditSearch && this.subredditSearch.length > 3) {
      if (sub.Subreddit.toLowerCase().indexOf(this.subredditSearch.toLowerCase()) === -1) {
        return false // filtered by search
      }
    }

    return true
  }

  private get inactiveSubs() {
    return this.subs.filter(this.isSubVisible)
  }

  private toggleActiveSub(sub: SubredditListItem) {
    this.$store.dispatch('TOGGLE_ACTIVE_SUB', sub)
  }
}
</script>

<template>
  <FullscreenPopupWithScroll
    title="Select subreddits"
    :isMenuOpen="isMenuOpen"
    @onCloseMenuClicked="onCloseMenuClicked"
  >
    <SortToggle />

    <div class="text-gray-100 font-light text-sm mx-2 mt-8">
      Active subreddits
    </div>
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
  </FullscreenPopupWithScroll>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import GridLayout from '@/layouts/GridLayout.vue'
import LoadingCardGrid from '@/components/loading/LoadingCardGrid.vue'
import BottomCard from '@/components/BottomCard.vue'
import { Dictionary } from 'lodash';
import { State, Getter } from 'vuex-class'
import FullscreenPopupWithScroll from '@/components/modals/FullscreenPopupWithScroll.vue'
import SortToggle from '@/modules/channels/SortToggle.vue'

@Component({
  components: {
    GridLayout,
    LoadingCardGrid,
    BottomCard,
    FullscreenPopupWithScroll,
    SortToggle,
  },
  computed: {
    ...mapState(['subsLoaded', 'subs', 'activeSubs']),
  },
})
export default class SubredditContainer extends Vue {
  @Prop({ default: false }) public isMenuOpen!: boolean

  @State public subsLoaded!: boolean
  @State public subs!: SubredditListItem[]
  @State public activeSubs!: SubredditListItem[]
  @Getter public activeSubsMap!: Dictionary< SubredditListItem >

  public subredditSearch = ''

  public onCloseMenuClicked() {
    this.$emit('onCloseMenuClicked')
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
